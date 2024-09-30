import { Request,Response } from "express"
import { authService } from "../services/authService";


export const signIn = async(req:Request,res:Response)=>{
    try {
        const {email,password,role} = req.body
        const user = await authService.signIn(email,password,role)
        return res.json(user)
    } catch (error) {
        console.error('Error founded in sign in',error);
        
    }
} 