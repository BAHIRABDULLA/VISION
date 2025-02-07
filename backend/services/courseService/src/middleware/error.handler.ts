import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../constants";

interface CustomError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log('Error in course middleware',err);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
        message
    });
};

export default errorHandler;
