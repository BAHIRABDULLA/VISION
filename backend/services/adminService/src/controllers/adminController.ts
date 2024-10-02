import {Request,Response} from 'express'
import { adminService } from "../services/adminService";
import mongoose from 'mongoose';
import Admin from '../models/adminSchema';

export const adminController = {
    loginControl: async (req: Request, res: any) => {
        try {
            const { email, password } = req.body
            // const user = await Admin.insertMany({email:'lala@gmail.com',password:'kjdkcjf3434'})
            // console.log(user,'user in ');
            
            const response = await adminService.login(email, password)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in login adminController ');
        }
    }
}