import { IBooking } from "../../interface/IBooking";
import bookingModel from "../../model/booking.model";
import { IBookingRepository } from "../interface/IBooking.repository";
import { BaseRepository } from "./base.repository";


export class BookingRepository extends BaseRepository<IBooking> implements IBookingRepository {

    async findByBookingData(mentorId:string,date:Date,time:string){
        try {
            const response = await bookingModel.findOne({mentorId,date,time})
            console.log(response,'response');
            
            return response
        } catch (error) {
            console.error('errror founding in find by booking data ',error);
            throw error
        }
    }

    async findBookingDataWithMentorId(mentorId:string){
        try {
            return await bookingModel.find({mentorId})
        } catch (error) {
            console.error('Error founded in find booking date with metnor id ',error);
            throw error
        }
    }
    
    async findByUserId(userId:string,role:string){
        try {
            return await bookingModel.find({[`${role}Id`]:userId})
        } catch (error) {
            console.error('Error founded in find by user id ',error);
            throw error
        }
    }
}