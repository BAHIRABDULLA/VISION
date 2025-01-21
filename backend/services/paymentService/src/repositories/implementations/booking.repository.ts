import { Model } from "mongoose";
import { IBooking } from "../../interfaces/IBooking";
import { IBookingRepository } from "../interface/IBooking.respository";
import BaseRepository from "./base.repository";

export class BookingRepository extends BaseRepository<IBooking> implements IBookingRepository {
    constructor(model:Model<IBooking>){
        super(model)
    }

    async findUserBookedSession(menteeId:string,mentorId:string){
        try {
            const response = await this.model.findOne({menteeId,mentorId})
            return response
        } catch (error) {
            console.error('Error founded in find user booked sesion',error);
            throw error
        }
    }
}