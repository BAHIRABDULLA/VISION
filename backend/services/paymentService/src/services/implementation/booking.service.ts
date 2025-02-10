import { IBookingRepository } from "../../repositories/interface/IBooking.respository";
import { IBookingService } from "../interface/IBooking.service";

export class BookingService implements IBookingService{
    constructor(private bookingRepository:IBookingRepository){}


    async createBookingData(data:object){
        try {   
            console.log(data, 'data in booking service in paymentService');
                     
             await this.bookingRepository.create(data)
            return null
        } catch (error) {
            console.error('Error founded in create booking data in booking service in paymentService',error)
            throw error            
        }
    }
}