

import { OtpRepository } from "../repositories/implementation/otp.repository";
import { UserRepository } from "../repositories/implementation/user.repository"
import { hashPassword, randomPassword } from "../utils/hash.util"
import { sentOTPEmail } from "../utils/email.util";
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { sendMentorData } from "../events/rabbitmq/publisher";
import { generateOtp } from "../utils/otp.util";
import { User } from "../models/user.model";
import IUserRepository from "../repositories/interface/IUser.repository";
import IUser from "../interfaces/IUser";
import Otp from "../models/otp.model";
import { createResponse } from "../utils/response.handler";


type SignInResult = {
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string;
    checkuser?: object
};


export class AuthService {
    private userRepository: UserRepository
    private otpRepository: OtpRepository
    constructor() {
        this.userRepository = new UserRepository(User)
        this.otpRepository = new OtpRepository(Otp)
    }


    // async signUp(fullName: string, email: string, password: string, role: string) {
    //     try {
    //         const existingUser = await this.userRepository.findByEmail(email)
    //         const hashedPassword = await hashPassword(password)
    //         if (existingUser && existingUser.isVerified && !existingUser.isMentorFormFilled) {
    //             await this.userRepository.update(existingUser._id.toString(),
    //                 {
    //                     fullName,
    //                     password: hashedPassword,
    //                     role: role as 'mentee' | 'mentor'
    //                 })

    //             const otp = generateOtp()
    //             await sentOTPEmail(email, otp)
    //             await this.otpRepository.create({ email, otp })
    //             return { success: true, message: "User application form is pending" }
    //         }
    //         if (existingUser && existingUser.isVerified) {

    //             return { success: false, message: 'User already existed' }
    //         } else if (existingUser && !existingUser.isVerified) {
    //             await this.userRepository.update(existingUser._id.toString(),
    //                 {
    //                     fullName,
    //                     password: hashedPassword,
    //                     role: role as 'mentee' | 'mentor'
    //                 })

    //             const otp = generateOtp()
    //             await sentOTPEmail(email, otp)
    //             await this.otpRepository.create({ email, otp })
    //             return { success: true, message: "User verification pending,please complete verification" }
    //         }
    //         const userData: any = {
    //             fullName,
    //             email,
    //             password: hashedPassword,
    //             role: role as 'mentee' | 'mentor'
    //         }
    //         if (role === 'mentor') {
    //             userData.isApproved = 'pending';
    //             userData.isMentorFormFilled = false
    //         }
    //         await this.userRepository.create(userData)
    //         const otp = generateOtp()
    //         await sentOTPEmail(email, otp)
    //         await this.otpRepository.create({ email, otp })

    //         return { success: true, message: 'User registration successfully' }
    //     } catch (error) {
    //         console.error('Error founded in sign up', error);
    //     }
    // }

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


    async verifySignUpOtp(fullName: string, email: string, password: string, role: string, otp: string) {
        try {
            const checkUser = await this.userRepository.findByEmail(email)
            if (checkUser && checkUser.isVerified) {
                return { success: false, message: "User already existed" }
            }
            const hashedPassword = await hashPassword(password)

            const getOtp = await this.otpRepository.findOtpByEmail(email)
            if (!getOtp) {
                return { success: false, message: 'OTP expired or invalid' }
            }
            const findOtp= getOtp.find(x=>x.otp==otp)
            
            if (findOtp) {
                const userData: any = {
                    fullName,
                    email,
                    password: hashedPassword,
                    role: role as 'mentee' | 'mentor',
                    isVerified:true
                }
                if (role === 'mentor') {
                    userData.isApproved = 'pending';
                    userData.isMentorFormFilled = false
                }
                const newUser = await this.userRepository.create(userData)
                console.log(newUser, ' new User in auth service ');
                
                // await this.userRepository.updateUserField(email, 'isVerified', true)
                await this.otpRepository.deleteOtp(email)
                const accessToken = generateAccessToken({ id: newUser._id.toString(),email, role: newUser.role })
                const refreshToken = generateRefreshToken({ id: newUser._id.toString(),email, role: newUser.role })

                if (newUser.role === 'mentee') {
                    return createResponse(true,'OTP verified successfully',{role: newUser.role, accessToken, refreshToken})
                    // return { success: true, message: 'OTP verified successfully', role: newUser.role, accessToken, refreshToken}
                } else {
                    await sendMentorData(newUser)
                    return createResponse(true,'OTP verified successfully',{role:newUser.role})
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
                const accessToken = generateAccessToken({ id: userData._id.toString(),email, role: userData.role })
                const refreshToken = generateRefreshToken({ id: userData._id.toString(),email, role: userData.role })
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
                await sendMentorData(userData)
            }
            const accessToken = generateAccessToken({ id: userData._id.toString(), email,role: userData.role })
            const refreshToken = generateRefreshToken({ id: userData._id.toString(),email, role: userData.role })
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
            if (!checkuser) {
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
            const accessToken = generateAccessToken({ id: checkuser._id.toString(),email, role: checkuser.role })
            const refreshToken = generateRefreshToken({ id: checkuser._id.toString(),email, role: checkuser.role })
            console.log(refreshToken,'refresh token in auth.service');
            
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

    async updateMentorField(id: string) {
        try {
            const updateData = {
                isMentorFormFilled: true
            }
            const updateMentor = await this.userRepository.update(id, updateData)
            return { updateMentor }
        } catch (error) {
            console.error('Error founded in updating updateMentorField', error);
        }
    }
}