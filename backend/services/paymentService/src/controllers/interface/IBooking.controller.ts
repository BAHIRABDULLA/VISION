import { NextFunction, Request, Response } from "express";


export interface IBookingController {
    createBooking(req: Request, res: Response, next: NextFunction): Promise<void>
}