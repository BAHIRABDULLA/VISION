import { Request,Response } from "express";
import { authService } from "../services/authService";


export const signUp= async(req:Request,res:Response)=>{
    console.log('here is first');
    
    try {
        const {fullName,email,password,role} = req.body
        console.log(fullName,'full',email,'emai',password,'pass',role,'role');
        const userData = {fullName,email,role}
        const user = await authService.signUp(fullName,email,password,role)
        return res.json(user)
    } catch (error) {
        console.error('error showing in auth controller signup',error);
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}