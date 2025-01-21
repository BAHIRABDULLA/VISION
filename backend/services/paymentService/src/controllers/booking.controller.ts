import { Request, Response, NextFunction } from "express";
import { IBookingService } from "../services/interface/IBooking.service";


export class BookingController {
    constructor(private bookingService: IBookingService) { }


    async createBooking(req: Request, res: Response,next:NextFunction){
        try {
            const response  = await this.bookingService.createBookingData(req.body)
            return res.status(201).json({message:"booking data created",response})
        } catch (error) {
            console.error('Error founded in create booking',error);
            next(error)
        } 
    }
}