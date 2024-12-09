

import { OtpRepository } from "../../repositories/implementation/otp.repository";
import { hashPassword, randomPassword } from "../../utils/hash.util"
import { sentOTPEmail } from "../../utils/email.util";
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../../utils/token.util";
import { sendMentorData } from "../../events/rabbitmq/producers/producer";
import { generateOtp } from "../../utils/otp.util";
import { User } from "../../models/user.model";
import IUserRepository from "../../repositories/interface/IUser.repository";
import IUser from "../../interfaces/IUser";
import Otp from "../../models/otp.model";
import { createResponse } from "../../utils/response.handler";
import { IAuthService } from "../interface/IAuth.service";


type SignInResult = {
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string;
    checkuser?: object
};


interface PasswordUpdate{
    currentPassword:string;
    newPassword:string;
    confirmPassword:string
}

export class AuthService  implements IAuthService{
    private userRepository: IUserRepository
    private otpRepository: OtpRepository
  
    constructor(userRepository:IUserRepository,otpRepository:OtpRepository){
        this.userRepository = userRepository;
        this.otpRepository = otpRepository
    }


    

    async signUp(email: string) {
        try {
            const existingUser = await this.userRepository.findByEmail(email)

            if (existingUser && existingUser.isVerified) {
                console.log(existingUser.isVerified, 'existnig user ');
                return createResponse(false, "User already exits")
            }
            const otp = generateOtp()
            await sentOTPEmail(email, otp)
            await this.otpRepository.create({ email, otp })
            return createResponse(true, "Sent to otp verification")
        } catch (error) {
            console.error('Error founded in sign up', error);
        }

    }


    async verifySignUpOtp(fullName: string, email: string, password: string, role: string, otp: string,type:string) {
        try {
            const checkUser = await this.userRepository.findByEmail(email)
            if (checkUser && checkUser.isVerified&&type!=='forgetPassword') {
                return { success: false, message: "User already existed" }
            }

            
            const getOtp = await this.otpRepository.findOtpByEmail(email)
            if (!getOtp) {
                return { success: false, message: 'OTP expired or invalid' }
            }
            const findOtp = getOtp.find(x => x.otp == otp)
            if(findOtp&& type==='forgetPassword'){
                return createResponse(true,'OTP verified successfully',checkUser?.role)
            }
            const hashedPassword = await hashPassword(password)
            if (findOtp) {
                const userData: any = {
                    fullName,
                    email,
                    password: hashedPassword,
                    role: role as 'mentee' | 'mentor',
                    isVerified: true
                }
                if (role === 'mentor') {
                    userData.isApproved = 'pending';
                    userData.isMentorFormFilled = false
                }
                const newUser = await this.userRepository.create(userData)
                console.log(newUser, ' new User in auth service ');

                // await this.userRepository.updateUserField(email, 'isVerified', true)
                await this.otpRepository.deleteOtp(email)
                const accessToken = generateAccessToken({ id: newUser._id.toString(), email, role: newUser.role })
                const refreshToken = generateRefreshToken({ id: newUser._id.toString(), email, role: newUser.role })

                if (newUser.role === 'mentee') {
                    return createResponse(true, 'OTP verified successfully', { role: newUser.role, accessToken, refreshToken,user:newUser })
                    // return { success: true, message: 'OTP verified successfully', role: newUser.role, accessToken, refreshToken}
                } else {
                    await sendMentorData('mentorQueue', newUser)
                    return createResponse(true, 'OTP verified successfully', { role: newUser.role })
                    // return { success: true, message: 'OTP verified successfully', role: newUser.role }
                }
            } else {
                return { success: false, message: 'Invalid otp' }
            }
        } catch (error) {
            console.error('Error founded in verify otp service', error);
        }
    }


    async resendOtpWork(email: string) {
        try {
            const otp = generateOtp()
            await sentOTPEmail(email, otp)
            await this.otpRepository.create({ email, otp })
            return { success: true, message: "Resend otp passed to user" }
        } catch (error) {
            console.error('Error founding on resentOtp work', error);
        }
    }


    async signInWithGoogle(email: string, name: string, role: string) {
        try {

            let userData = await this.userRepository.findByEmail(email)
            if (userData) {
                const accessToken = generateAccessToken({ id: userData._id.toString(), email, role: userData.role })
                const refreshToken = generateRefreshToken({ id: userData._id.toString(), email, role: userData.role })
                return {
                    success: true, message: 'Sign in with google completed', role: role, exist: true,
                    accessToken, refreshToken, user: userData
                }
            }
            const password = randomPassword
            console.log(randomPassword, 'randomPassword');

            const hashedPassword = await hashPassword(password)
            userData = await this.userRepository.create({
                email,
                fullName: name,
                password: hashedPassword,
                role: role as 'mentee' | 'mentor',
                isVerified: true
            })
            if (role === 'mentor') {
                await sendMentorData('mentorQueue', userData)
            }
            const accessToken = generateAccessToken({ id: userData._id.toString(), email, role: userData.role })
            const refreshToken = generateRefreshToken({ id: userData._id.toString(), email, role: userData.role })
            return {
                success: true, message: 'Sign in with google completed', role: role, exist: false,
                accessToken, refreshToken, user: userData
            }
        } catch (error) {
            console.error('Error founded in google with sign in ', error);
        }
    }


    async signIn(email: string, password: string, role: string): Promise<SignInResult | undefined> {
        try {
            const checkuser = await this.userRepository.findByEmail(email)
            if (!checkuser || role!==checkuser.role) {
                return { success: false, message: "User not existed" }
            }
            if (checkuser.isVerified === false) {
                return { success: false, message: "User not verified" }
            }
            const passwordCheck = await bcrypt.compare(password, checkuser.password)
            if (!passwordCheck) {
                return { success: false, message: "Invalid credentials , please try again" }
            }
            // if (checkuser.role === 'mentor' && checkuser.isApproved == 'pending') {
            //     return { success: false, message: "Mentor approval pending. Please wait for admin approval" }
            // }
            // if (checkuser.role === 'mentor' && checkuser.isApproved == 'rejected') {
            //     return { success: false, message: "Mentor approval rejected." }
            // }
            const accessToken = generateAccessToken({ id: checkuser._id.toString(), email, role: checkuser.role })
            const refreshToken = generateRefreshToken({ id: checkuser._id.toString(), email, role: checkuser.role })
            console.log(refreshToken, 'refresh token in auth.service');

            return { success: true, message: "Sign in successfully completed", checkuser, accessToken, refreshToken };
        } catch (error) {
            console.error('Error founded in sign in ', error);
        }
    }


    async sendMail(email: string) {
        try {
            console.log('-----    sendMail function auth.service   ----');

            const isUser = await this.userRepository.findByEmail(email)
            if (!isUser || isUser.isVerified === false) {
                return { success: false, message: "User not registered" }
            }
            const otp = generateOtp()

            await sentOTPEmail(email, otp)
            await this.otpRepository.create({ email, otp })
            return { success: true, messsage: "OTP send to user email" }
        } catch (error) {
            console.error('Error founded in send mail', error);
        }
    }


    async resetPassword(email: string, password: string, confirmPassword: string) {
        try {
            if (password !== confirmPassword) {
                return { success: false, message: "Password do not match" }
            }
            const hashedPassword = await hashPassword(password)

            // const changePassowrd = await this.userRepository.updatePasswordUser(email, hashedPassword)
            const changePassowrd = await this.userRepository.updateUserField(email, 'password', hashedPassword)
            return { success: true, message: "New password updated" }
        } catch (error) {
            console.error('Error founded in reset password', error);
        }
    }

    async updateFormFieldAndPhoto(id: string, profile: string) {
        try {
            const updateData = {
                isMentorFormFilled: true,
                profile
            }
            
            const updateMentor = await this.userRepository.update(id, updateData)
            console.log(updateMentor,'update mentor ');
            
            return { updateMentor }
        } catch (error) {
            console.error('Error founded in updating updateMentorField', error);
        }
    }



    async passwordUpdate(id:string,data:PasswordUpdate){
        try {
            const {currentPassword,newPassword,confirmPassword} = data
            console.log(currentPassword,newPassword,confirmPassword,'))))');
            const checkUser = await this.userRepository.findById(id)
            if(!checkUser){
                return {success:false,message:'not user'}
            }
          const checkPassword = await bcrypt.compare(currentPassword,checkUser.password)
          console.log(checkPassword,'checkPassword');
          
          if(!checkPassword){
              return {success:false,message:'wrong password'}
          }
          if(newPassword !== confirmPassword){
              return {success:false,message:'password do not match'}
          }
          const hashedPassword = await hashPassword(newPassword)
          const updatePassword = await this.userRepository.update(id,{password:hashedPassword})
          console.log(updatePassword,'update password');
          if(!updatePassword){
              return {success:false,message:'not updated'}
          }
          return {success:true,message:'updated'}

        } catch (error) {
            console.error('Error founded in password update',error);
            return {success:false,message:'error'}
        }
    }
}