
import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    statusCode?: number;

}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log('Error in mentor middleware',err,'error.message )))) ',err.message);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

     res.status(statusCode).json({
        success:false,
        message
    });
};

export default errorHandler;
