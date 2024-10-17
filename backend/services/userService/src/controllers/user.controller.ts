import { Request,Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";

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
        console.log(id,'id in get user by id user service');
        
        const user  = await userService.getUser(id)
        console.log(user,'user user ');
        
        res.json(user)
    }
    async updateUserStatus(req:Request,res:Response){
        const { id } = req.params;
        const { isApproved } = req.body;
        try {
            if (!['pending', 'approved', 'rejected'].includes(isApproved)) {
                return res.status(400).json({ message: 'Invalid approval status' });
              }
          
              // Find the user by ID and update the approval status
              const updatedUser = await User.findByIdAndUpdate(
                id,
                { isApproved },  // Update the isApproved field
                { new: true }    // Return the updated document
              );
          
              // If user not found
              if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
              }
          
              // Send the updated user as a response
              res.status(200).json({ success: true, user: updatedUser });
        } catch (error) {
            
        }
    }
}



export default new UserController()