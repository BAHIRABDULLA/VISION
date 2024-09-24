import { Request,Response } from "express";
import { authService } from "../services/authService";

export const authController = {
    signUp:async(req:Request,res:Response)=>{
        console.log('here is first');
        
        try {
            const {fullName,email,password} = req.body
            const user = await authService.signUp(fullName,email,password)
            return res.status(201).json({message:"User created successfully",user})
        } catch (error) {
            console.error('error showing in auth controller signup',error);
        }
    }
}