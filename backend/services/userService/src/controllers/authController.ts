import { Request,Response } from "express";
import { authService } from "../services/authService";

export const authController = {
    signUp:async(req:Request,res:Response)=>{
        const {fullName,email,password} = req.body
        try {
            const user = await authService.signUp(fullName,email,password)
            return res.status(201).json({message:"User created successfully",user})
        } catch (error) {
            
        }
    }
}