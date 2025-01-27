import { Request, Response, NextFunction } from "express";
import { IBookingService } from "../../services/interface/IBooking.service";
import { IBookingController } from "../interface/IBooking.controller";


export class BookingController implements IBookingController {
    constructor(private bookingService: IBookingService) { }


    async createBooking(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.bookingService.createBookingData(req.body)
            res.status(201).json({ message: "booking data created", response })
        } catch (error) {
            console.error('Error founded in create booking', error);
            next(error)
        }
    }
}