import { Request,Response } from "express"
import { authService } from "../services/authService";


export const signIn = async(req:Request,res:Response)=>{
    try {
        const {email,password,role} = req.body
        const result = await authService.signIn(email,password,role)
        return res.json(result)
        // if (!result) {
        //     return res.status(500).json({ message: 'Internal Server Error' });
        // }
        // if (!result.success) {
        //     return res.status(400).json({ message: result.message });
        // }
        // res.cookie('refreshToken', result.refreshToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000, 
        // });

        // return res.json({ message: result.message, accessToken: result.accessToken });
    } catch (error) {
        console.error('Error founded in sign in',error);
        
    }
} 