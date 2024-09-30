

import { otpRepository } from "../repositories/otpRepository";
import { userRepository } from "../repositories/userRepository"
import { hashPassword, randomPassword } from "../utils/hashPassword"
import { generateOtp, sentOTPEmail } from "../utils/otpGenerator";
import bcrypt from 'bcryptjs'
import admin from 'firebase-admin'



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
            await userRepository.updateUserVerificationStatus(email, true)
            await otpRepository.deleteOtp(email)

            console.log(otp, 'otp', getOtp, 'get otp in auth service *******');

            return { success: true, message: 'OTP verified successfully' }
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
    
    signInWithGoogle: async (email: string,name:string,role:string) => {
        try {
            console.log('its reached in sign iin with google in auth service');
            
            const existingUser = await userRepository.findByEmail(email)
            if(existingUser){
                return { success: true, message: 'Sign in with google completed' }
            }
            const password = randomPassword
            console.log(randomPassword,'randomPassword');
            
            const hashedPassword = await hashPassword(password)
            console.log(hashedPassword,'hashedPassword in in auth service');
            const newUser = await userRepository.createUser({
                email,
                fullName:name,
                password:hashedPassword,
                role,
                isVerified:true
            })
        return { success: true, message: 'Sign in with google completed' }
        } catch (error) {
            console.error('Error founded in google with sign in ',error);
        }
    },
    signIn:async(email:string,password:string,role:string)=>{
        try {
            const checkuser =await userRepository.findByEmail(email)
            console.log(checkuser,'check user in sign in ');
            
            if(!checkuser){
                return {success:false,message:"User not existed"}
            }
            // const passwordCheck = await bcrypt.compare(password,checkuser.password)
        } catch (error) {
            console.error('Error founded in sign in ',error);
        }
    }
}