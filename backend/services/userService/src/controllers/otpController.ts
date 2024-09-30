import { Request,Response } from "express"
import { authService } from "../services/authService"

export const verifyOtp = async(req:Request,res:Response)=>{
    try {
        const {email,otp} = req.body
        console.log(email,'email',otp, 'otp in verify otp controller ---')
        const otpService =await authService.verifySignUpOtp(email,otp)
        return res.json(otpService)
    } catch (error) {
        console.error('Error founded in verify otp ',error);
        
    }
}

export const resendOtp = async(req:Request,res:Response)=>{
    try {
        const {email} = req.body
        console.log(email);
        const otpToService = await authService.resendOtpWork(email)
        return res.json(otpToService)
    } catch (error) {
        
    }
}