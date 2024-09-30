import { Request,Response } from "express";
import { authService } from "../services/authService";

export const forgetPassword = async(req:Request,res:Response)=>{
    try {
        const {email} = req.body
        const response = await authService.sendMail(email)
        return res.json(response)
    } catch (error) {
        console.error('Error founded in forget password',error);
        
    }
}