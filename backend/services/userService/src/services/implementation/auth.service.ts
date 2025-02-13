

import { OtpRepository } from "../../repositories/implementation/otp.repository";
import { hashPassword, randomPassword } from "../../utils/hash.util"
import { sentOTPEmail } from "../../utils/email.util";
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../../utils/token.util";
import { sendUserData } from "../../events/rabbitmq/producers/producer";
import { generateOtp } from "../../utils/otp.util";
import { User } from "../../models/user.model";
import IUserRepository from "../../repositories/interface/IUser.repository";
import IUser from "../../interfaces/IUser";
import Otp from "../../models/otp.model";
import { createResponse } from "../../utils/response.handler";
import { IAuthService } from "../interface/IAuth.service";
import { ERROR_MESSAGES } from "../../constants/error.message";
import { SUCCESS_MESSAGES } from "../../constants/success.message";
import { USER_ROLES } from "../../constants/user.role";



export type SignInResult = {
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string;
    checkuser?: object
};


interface PasswordUpdate {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string
}

export class AuthService implements IAuthService {
    private userRepository: IUserRepository
    private otpRepository: OtpRepository

    constructor(userRepository: IUserRepository, otpRepository: OtpRepository) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository
    }




    async signUp(email: string) {
        try {
            const existingUser = await this.userRepository.findByEmail(email)

            if (existingUser && existingUser.isVerified) {
                return createResponse(false, ERROR_MESSAGES.USER_ALREADY_EXISTS)
            }
            const otp = generateOtp()
            await sentOTPEmail(email, otp)
            await this.otpRepository.create({ email, otp })
            return createResponse(true, SUCCESS_MESSAGES.SENT_OTP_VERIFICATION)
        } catch (error) {
            console.error('Error founded in sign up', error);
        }

    }


    async verifySignUpOtp(fullName: string, email: string, password: string, role: string, otp: string, type: string) {
        try {
            const checkUser = await this.userRepository.findByEmail(email)
            if (checkUser && checkUser.isVerified && type !== 'forgetPassword') {
                return { success: false, message: ERROR_MESSAGES.USER_ALREADY_EXISTS}
            }


            const getOtp = await this.otpRepository.findOtpByEmail(email)
            if (!getOtp) {
                return { success: false, message: ERROR_MESSAGES.OTP_EXPIRED_OR_INVALID }
            }
            const findOtp = getOtp.find(x => x.otp == otp)
            if (findOtp && type === 'forgetPassword') {
                return createResponse(true, SUCCESS_MESSAGES.OTP_VERIFIED_SUCCESSFULLY, checkUser?.role)
            }
            const hashedPassword = await hashPassword(password)
            if (findOtp) {
                const userData:any = {
                    fullName,
                    email,
                    password: hashedPassword,
                    role: role as 'mentee' | 'mentor',
                    isVerified: true
                }
                if (role === USER_ROLES.MENTOR) {
                    userData.isApproved = 'pending';
                    userData.isMentorFormFilled = false
                }
                const newUser = await this.userRepository.create(userData)

                // await this.userRepository.updateUserField(email, 'isVerified', true)
                await this.otpRepository.deleteOtp(email)
                const accessToken = generateAccessToken({ id: newUser._id.toString(), email, role: newUser.role })
                const refreshToken = generateRefreshToken({ id: newUser._id.toString(), email, role: newUser.role })

                await sendUserData('userExchange', newUser)
                if (newUser.role === USER_ROLES.MENTEE) {
                    return createResponse(true, SUCCESS_MESSAGES.OTP_VERIFIED_SUCCESSFULLY, { role: newUser.role, accessToken, refreshToken, user: newUser })
                    // return { success: true, message: 'OTP verified successfully', role: newUser.role, accessToken, refreshToken}
                } else {
                    return createResponse(true, SUCCESS_MESSAGES.OTP_VERIFIED_SUCCESSFULLY, { role: newUser.role })
                    // return { success: true, message: 'OTP verified successfully', role: newUser.role }
                }
            } else {
                return { success: false, message: ERROR_MESSAGES.OTP_EXPIRED_OR_INVALID}
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

            const hashedPassword = await hashPassword(password)
            userData = await this.userRepository.create({
                email,
                fullName: name,
                password: hashedPassword,
                role: role as 'mentee' | 'mentor',
                isVerified: true
            })

            await sendUserData('userExchange', userData)

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
            if (!checkuser || role !== checkuser.role) {
                return { success: false, message: ERROR_MESSAGES.USER_NOT_FOUND }
            }
            if (checkuser.isVerified === false) {
                return { success: false, message: "User not verified" }
            }
            if(checkuser.isActive===false){
                return {success:false,message:"Your account has been blocked. Please contact support for assistance."}
            }
            const passwordCheck = await bcrypt.compare(password, checkuser.password)
            if (!passwordCheck) {
                return { success: false, message: ERROR_MESSAGES.INVALID_CREADENTIALS }
            }
            // if (checkuser.role === 'mentor' && checkuser.isApproved == 'pending') {
            //     return { success: false, message: "Mentor approval pending. Please wait for admin approval" }
            // }
            // if (checkuser.role === 'mentor' && checkuser.isApproved == 'rejected') {
            //     return { success: false, message: "Mentor approval rejected." }
            // }
            const accessToken = generateAccessToken({ id: checkuser._id.toString(), email, role: checkuser.role })
            const refreshToken = generateRefreshToken({ id: checkuser._id.toString(), email, role: checkuser.role })

            return { success: true, message: "Sign in successfully completed", checkuser, accessToken, refreshToken };
        } catch (error) {
            console.error('Error founded in sign in ', error);
        }
    }


    async sendMail(email: string) {
        try {

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

            return { updateMentor }
        } catch (error) {
            console.error('Error founded in updating updateMentorField', error);
        }
    }



    async passwordUpdate(id: string, data: PasswordUpdate) {
        try {
            const { currentPassword, newPassword, confirmPassword } = data
            const checkUser = await this.userRepository.findById(id)
            if (!checkUser) {
                return { success: false, message: 'not user' }
            }
            const checkPassword = await bcrypt.compare(currentPassword, checkUser.password)

            if (!checkPassword) {
                return { success: false, message: 'wrong password' }
            }
            if (newPassword !== confirmPassword) {
                return { success: false, message: 'password do not match' }
            }
            const hashedPassword = await hashPassword(newPassword)
            const updatePassword = await this.userRepository.update(id, { password: hashedPassword })
            if (!updatePassword) {
                return { success: false, message: 'not updated' }
            }
            return { success: true, message: 'updated' }

        } catch (error) {
            console.error('Error founded in password update', error);
            return { success: false, message: 'error' }
        }
    }
}