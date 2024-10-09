import { Request,Response } from "express";
import { userRepository } from "../repositories/userRepository";

export const getAllUsers = async(req:Request,res:Response)=>{
    try {
        const response = await userRepository.getAllUsers()
        res.json(response)
    } catch (error) {
        console.error('Error founded fetching all users',error);
    }
}