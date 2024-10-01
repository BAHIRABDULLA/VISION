import { Request,Response } from "express";
import { authService } from "../services/authService";

export const resetPassword = async(req:Request,res:Response)=>{
    try {
        const {email,password,confirmPassword} = req.body
        console.log(email,'email',password,'password',confirmPassword,'confirmPassword in the resetPass');
        const response = await authService.resetPassword(email,password,confirmPassword)
        return res.json(response)
    } catch (error) {
        console.error('Error founded in reset password',error);
    }
}