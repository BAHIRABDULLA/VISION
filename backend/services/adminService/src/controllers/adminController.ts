import {Request,Response} from 'express'
import { adminService } from "../services/adminService";
import mongoose from 'mongoose';
import Admin from '../models/adminSchema';



export const adminController = {
    loginControl: async (req: Request, res: any) => {
        console.log('this is admin service controller ');
        
        try {
            const { email, password } = req.body
            // const user = await Admin.insertMany({email:'lala@gmail.com',password:'kjdkcjf3434'})
            // console.log(user,'user in ');
            
            const response = await adminService.login(email, password)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in login adminController ');
        }
    },
    getAllUsers:async(req:Request,res:Response)=>{
        try {
            console.log('%%%%%%%%%%%%%%%%');
            
            const response = await adminService.users()
        } catch (error) {
            console.error("Error fetching all users",error);
        }
    }
}