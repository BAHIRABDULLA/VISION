import { Request, Response, NextFunction } from "express";
import { IBookingService } from "../../services/interface/IBooking.service";
import { IBookingController } from "../interface/IBooking.controller";
import { HttpStatus } from "../../enums/http.status";
import { SUCCESS_MESSAGES } from "../../constant";


export class BookingController implements IBookingController {
    constructor(private bookingService: IBookingService) { }


    async createBooking(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.bookingService.createBookingData(req.body)
            res.status(HttpStatus.CREATED).json({ message: SUCCESS_MESSAGES.BOOKING_CREATED, response })
        } catch (error) {
            next(error)
        }
    }
}