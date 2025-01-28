import { IBooking } from "../../interface/IBooking";
import bookingModel from "../../model/booking.model";
import { IBookingRepository } from "../interface/IBooking.repository";
import { BaseRepository } from "./base.repository";


export class BookingRepository extends BaseRepository<IBooking> implements IBookingRepository {

    async findByBookingData(mentorId:string,date:Date,time:string){
        try {
            console.log(mentorId,'mentorId');
            
            const response = await bookingModel.findOne({mentorId,date,time})
            console.log(response,'response');
            
            return response
        } catch (error) {
            throw error
        }
    }

    async findBookingDataWithMentorId(mentorId:string){
        try {
            return await bookingModel.find({mentorId})
        } catch (error) {
            throw error
        }
    }
    
    async findByUserId(userId:string,role:string){
        try {
            return await bookingModel.find({[`${role}Id`]:userId})
            .populate(role === 'mentee' ? 'mentorId' : 'menteeId');
        } catch (error) {
            throw error
        }
    }
}