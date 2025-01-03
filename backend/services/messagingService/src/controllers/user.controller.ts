import { HttpStatus } from "../enums/http.status";
import { UserService } from "../services/implementation/user.service";
import { NextFunction, Request,Response } from "express";

export class UserController {
    constructor(private userService:UserService){}

    async getAllUsers(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} = req.params
            const response = await this.userService.getAllUsers(userId)
            // console.log(response,'response  to get all users ');
            
            return res.status(HttpStatus.OK).json({message:"Users data  successfully sent",users:response})
        } catch (error) {
            console.error('Error founded in get all users in controller ',error);
            next(error)
        }
    }
} 