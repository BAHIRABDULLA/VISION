// export interface IResponseData<T= null>{
//     success:boolean;
//     message:string;
//     data?:T
// }
// export const successResponse = <T>(message:string,data?:T):IResponseData<T> =>({
//     success:true,
//     message,
//     data
// })


// export const errorResponse = (message:string):IResponseData =>({
//     success:false,
//     message
// })

import { Response } from "express";

// export interface IResponseData<T= null>{
//         message:string;
//         data?:T
//     }

// interface IResponseData<T> {
//     data?: T
// }

export const successResponse = <T>(res:Response,statusCode:number,message: string,data:T)=>{
   res.status(statusCode).json({message,data})
}

export const errorResponse = (res:Response,statusCode:number,message:string)=>{
    res.status(statusCode).json({message})
}