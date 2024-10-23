import { Request,Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../enums/http.status";



interface CustomeRequest extends Request{
    user?:string| JwtPayload
}

const userService  = new UserService()


class UserController {

    async getAllUsers(req:Request,res:Response){
        try {
            const response = await userService.getAllUsers()
            res.json(response)
        } catch (error) {
            console.error('Error founded fetching all users',error);
        }
    }


    async getUserById (req:Request,res:Response){
        const {id}= req.params
        const user  = await userService.getUser(id)
        res.json(user)
    }


    async updateUserStatus(req:Request,res:Response){
        const { id } = req.params;
        const { isApproved } = req.body;
        try {
            if (!['pending', 'approved', 'rejected'].includes(isApproved)) {
                return res.status(400).json({ message: 'Invalid approval status' });
              }
          
              const updatedUser = await User.findByIdAndUpdate(
                id,
                { isApproved }, 
                { new: true }    
              );
              
              if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
              }
          
              res.status(200).json({ success: true, user: updatedUser });
        } catch (error) {
            
        }
    }

    async getUser(req:CustomeRequest,res:Response){
        try {
            console.log('------------');
            const user = req.user as JwtPayload
            console.log(user,'user, ===========');
            
            if(!user){
                return res.json({message:'dkf'})
            } 
            console.log(user,'user s');
            
            const response = await userService.getUser(user.id)
            console.log(response,'response in user controller get user');
            
            return res.status(HttpStatus.OK).json(response)
        } catch (error) {
            console.error('Error founded in get user',error);
        }
    }

   
}



export default new UserController()