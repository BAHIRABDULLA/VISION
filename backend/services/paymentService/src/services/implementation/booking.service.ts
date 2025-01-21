import { IBookingRepository } from "../../repositories/interface/IBooking.respository";
import { IBookingService } from "../interface/IBooking.service";

export class BookingService implements IBookingService{
    constructor(private bookingRepository:IBookingRepository){}


    async createBookingData(data:object){
        try {            
            const response = await this.bookingRepository.create(data)
            return response
        } catch (error) {
            console.error('Error founded in create booking data in booking service in paymentService',error)
            throw error            
        }
    }
}