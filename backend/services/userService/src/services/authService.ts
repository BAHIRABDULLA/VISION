

import { otpRepository } from "../repositories/otpRepository";
import { userRepository } from "../repositories/userRepository"
import { hashPassword } from "../utils/hashPassword"
import { generateOtp, sentOTPEmail } from "../utils/otpGenerator";


export const authService = {
    signUp:async(fullName:string,email:string,password:string,role:string)=>{
        console.log('here 2 nd ');
        
        const existingUser = await userRepository.findByEmail(email)
        if(existingUser){
             return {success:false,message:'User already existed'}
        }
        const hashedPassword = await hashPassword(password)
       
        const userData = {
            fullName,
            email,
            password:hashedPassword,
            role
        }
        const addUser = await userRepository.createUser(userData)
        const otp = generateOtp()
        console.log(otp,'otp in auth service');
        await sentOTPEmail(email,otp)
        await otpRepository.storeOtp(email,otp)
        
        return {success:true,message:'User registration successfully'}
    },
    verifySignUpOtp:async(email:string,otp:string)=>{
        const checkUser = await userRepository.findByEmail(email)
        console.log(checkUser,'check user  in sign up otp ');
        if(!checkUser){
             return {success:false,message:"Email doesn't existing"}
        }
        const getOtp=await otpRepository.findOtpByEmail(email)
        console.log(getOtp,'getOtp in verifySignUpOtp');
        if(!getOtp){
            return {success:false,message:'OTP expired or invalid'}
        }
        if(otp===getOtp?.otp){
            await userRepository.updateUserVerificationStatus(email,true)
            await otpRepository.deleteOtp(email)

            console.log(otp,'otp',getOtp,'get otp in auth service *******');
            
            return {success:true,message:'OTP verified successfully'}
        }else{
            return {success:false,message:'Invalid otp'}
        }
    }
}