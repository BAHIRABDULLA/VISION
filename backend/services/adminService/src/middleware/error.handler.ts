import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../enums/http.status";

interface CustomError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log('Error in admin middleware',err);
    
    const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        message
    });
};

export default errorHandler;
