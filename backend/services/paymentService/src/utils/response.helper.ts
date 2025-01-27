import { Response } from "express";


export const successResponse = <T>(res:Response,statusCode:number,message: string,data?:T)=>{
   res.status(statusCode).json({message,...data})
}

export const errorResponse = (res:Response,statusCode:number,message:string)=>{
    res.status(statusCode).json({message})
}