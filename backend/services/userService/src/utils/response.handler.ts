import { Response } from "express";


type ResponseFormat ={
    success:boolean
    message:string;
    data?:any
}
export const createResponse = (success: boolean, message: string, data?: any, role?: string):ResponseFormat =>{
    return {
        success,
        message,
        ...(data&&{data})
    }
}

export const sendResponse = (res: Response, statusCode: number, success: boolean, message: string, data: any = {}) => {
    return res.status(statusCode).json({
        success,
        message,
        ...data, 
    });
};