import { Request,Response } from "express";
import { authService } from "../services/authService";


export const signUp= async(req:Request,res:Response)=>{
    console.log('here is first');
    
    try {
        const {fullName,email,password,role} = req.body
        console.log(fullName,'full',email,'emai',password,'pass',role,'role');
        const userData = {fullName,email,role}
        const user = await authService.signUp(fullName,email,password,role)
        return res.status(201).json({success:true, message:"User created successfully",userData})
    } catch (error) {
        console.error('error showing in auth controller signup',error);
    }
}