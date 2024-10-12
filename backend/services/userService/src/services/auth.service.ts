

import { otpRepository } from "../repositories/implementation/otp.repository";
import { userRepository } from "../repositories/implementation/user.repository"
import { hashPassword, randomPassword } from "../utils/hash.util"
import {  sentOTPEmail } from "../utils/email.util";
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "../utils/token.util";
import { sendMentorData } from "../events/rabbitmq/publisher";
import { generateOtp } from "../utils/otp.util";


type SignInResult = {
    success: boolean;
    message: string;
    accessToken?: string;
    refreshToken?: string;
    checkuser?: object
};




export const authService = {
    signUp: async (fullName: string, email: string, password: string, role: string) => {
        console.log('here 2 nd ');

        const existingUser = await userRepository.findByEmail(email)
        if (existingUser) {
            return { success: false, message: 'User already existed' }
        }
        const hashedPassword = await hashPassword(password)

        const userData = {
            fullName,
            email,
            password: hashedPassword,
            role
        }
        const addUser = await userRepository.createUser(userData)
        const otp = generateOtp()
        console.log(otp, 'otp in auth service');
        await sentOTPEmail(email, otp)
        await otpRepository.storeOtp(email, otp)

        return { success: true, message: 'User registration successfully' }
    },
    verifySignUpOtp: async (email: string, otp: string) => {
        const checkUser = await userRepository.findByEmail(email)
        console.log(checkUser, 'check user  in sign up otp ');
        if (!checkUser) {
            return { success: false, message: "Email doesn't existing" }
        }
        const getOtp = await otpRepository.findOtpByEmail(email)
        console.log(getOtp, 'getOtp in verifySignUpOtp');
        if (!getOtp) {
            return { success: false, message: 'OTP expired or invalid' }
        }
        if (otp === getOtp?.otp) {
            console.log(otp, 'otp', getOtp, 'get otp in auth service *******');

            await userRepository.updateUserVerificationStatus(email, true)
            await otpRepository.deleteOtp(email)
            const accessToken = generateAccessToken({ id: checkUser._id.toString(), role: checkUser.role })
            console.log(accessToken, 'access token in auth service ');
            const refreshToken = generateRefreshToken({ id: checkUser._id.toString(), role: checkUser.role })
            console.log(refreshToken, 'refresh token in auth service');

            if (checkUser.role === 'mentee') {
                return { success: true, message: 'OTP verified successfully', role: checkUser.role, accessToken, refreshToken }
            } else {
                await sendMentorData(checkUser)
                return { success: true, message: 'OTP verified successfully', role: checkUser.role }
            }
        } else {
            return { success: false, message: 'Invalid otp' }
        }
    },
    resendOtpWork: async (email: string) => {
        try {
            const otp = generateOtp()
            console.log(otp, 'otp in resend otp work');
            await sentOTPEmail(email, otp)
            await otpRepository.storeOtp(email, otp)
            return { success: true, message: "Resend otp passed to user" }
        } catch (error) {
            console.error('Error founding on resentOtp work', error);
        }
    },

    signInWithGoogle: async (email: string, name: string, role: string) => {
        try {
            console.log('its reached in sign iin with google in auth service');

            let userData = await userRepository.findByEmail(email)
            if (userData) {
                const accessToken = generateAccessToken({ id: userData._id.toString(), role: userData.role })
                const refreshToken = generateRefreshToken({ id: userData._id.toString(), role: userData.role })
                return { success: true, message: 'Sign in with google completed', role: role, exist: true,
                    accessToken,refreshToken
                 }
            }
            const password = randomPassword
            console.log(randomPassword, 'randomPassword');

            const hashedPassword = await hashPassword(password)
            console.log(hashedPassword, 'hashedPassword in in auth service');
             userData = await userRepository.createUser({
                email,
                fullName: name,
                password: hashedPassword,
                role,
                isVerified: true
            })
            if(role==='mentor'){
                await sendMentorData(userData)
            }
            const accessToken = generateAccessToken({ id: userData._id.toString(), role: userData.role })
            const refreshToken = generateRefreshToken({ id: userData._id.toString(), role: userData.role })
            return { success: true, message: 'Sign in with google completed', role: role, exist: false,
                accessToken,refreshToken
             }
        } catch (error) {
            console.error('Error founded in google with sign in ', error);
        }
    },
    signIn: async (email: string, password: string, role: string): Promise<SignInResult | undefined> => {
        try {
            const checkuser = await userRepository.findByEmail(email)
            console.log(checkuser, 'check user in sign in ');

            if (!checkuser) {
                return { success: false, message: "User not existed" }
            }
            if (checkuser.isVerified === false) {
                return { success: false, message: "User not verified" }
            }
            const passwordCheck = await bcrypt.compare(password, checkuser.password)
            console.log(passwordCheck, 'passwordCheck in sign in ');
            if (!passwordCheck) {
                return { success: false, message: "Invalid credentials , please try again" }
            }
            if (checkuser.role === 'mentor' && checkuser.isApproved=='pending') {
                return { success: false, message: "Mentor approval pending. Please wait for admin approval" }
            }
            if (checkuser.role === 'mentor' && checkuser.isApproved=='rejected') {
                return { success: false, message: "Mentor approval rejected." }
            }
            const accessToken = generateAccessToken({ id: checkuser._id.toString(), role: checkuser.role })
            const refreshToken = generateRefreshToken({ id: checkuser._id.toString(), role: checkuser.role })

            return { success: true, message: "Sign in successfully completed", checkuser, accessToken, refreshToken };
        } catch (error) {
            console.error('Error founded in sign in ', error);
        }
    },
    sendMail: async (email: string) => {
        try {
            const isUser = await userRepository.findByEmail(email)
            if (!isUser || isUser.isVerified === false) {
                return { success: false, message: "User not registered" }
            }
            const otp = generateOtp()
            console.log(otp, 'otp in sed email');

            await sentOTPEmail(email, otp)
            await otpRepository.storeOtp(email, otp)
            return { success: true, messsage: "OTP send to user email" }
        } catch (error) {
            console.error('Error founded in send mail', error);
        }
    },
    resetPassword: async (email: string, password: string, confirmPassword: string) => {
        try {
            if (password !== confirmPassword) {
                return { success: false, message: "Password do not match" }
            }
            const hashedPassword = await hashPassword(password)
            console.log(hashedPassword, 'hashedPassword in resetPassword');

            const changePassowrd = await userRepository.updatePasswordUser(email, hashedPassword)
            return { success: true, message: "New password updated" }
        } catch (error) {
            console.error('Error founded in reset password', error);
        }
    }
}