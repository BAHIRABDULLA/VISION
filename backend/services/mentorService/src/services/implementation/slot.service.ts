import mongoose, { Mongoose } from "mongoose";
import { IBooking } from "../../interface/IBooking";
import Slot from "../../model/slot.model";
import { BookingRepository } from "../../repositories/implementation/booking.repository";
import { SlotRepository } from "../../repositories/implementation/slot.repository";
import { ISlotService } from "../interface/ISlot.service";
import CustomError from "../../utils/custom.error";
import { HttpStatus } from "../../enums/http.status";



export class SlotService implements ISlotService {


    constructor(private slotRepository: SlotRepository, private bookingRepository: BookingRepository) { }

    async createSlot(data: object) {
        try {
            const response = await this.slotRepository.create(data)
            console.log(response, 'response in create slot');
            return response
        } catch (error) {
            console.error('Error founded in slot service', error);
        }
    }


    async getSlots() {
        try {
            const getAllSlots = await this.slotRepository.findAll()
            return getAllSlots
        } catch (error) {
            console.error('Error founded in get slots', error);
        }
    }

    async deleteSlot(id: string) {
        try {
            const resposne = await this.slotRepository.delete(id)
            return resposne
        } catch (error) {
            console.error('Error founded in delete slot in slot service', error);
        }
    }


    async bookSlot(mentorId: string, menteeId: string, time: string, date: Date): Promise<any> {
        try {

            console.log(mentorId, 'mentorId', menteeId, 'menteeId', time, 'time', date, 'date  in booking slot');
            const today = new Date()
            const providedDate = new Date(date)
            console.log(providedDate, 'provided date');
            if (providedDate < today) {
                throw new CustomError('Selected date cannot be in the past. Please choose a valid date', HttpStatus.UNAUTHORIZED)
            }
            const data: Partial<IBooking> = {
                mentorId: new mongoose.Types.ObjectId(mentorId),
                menteeId: new mongoose.Types.ObjectId(menteeId),
                date,
                time
            }
            const response = await this.bookingRepository.create(data)
            return response
        } catch (error) {
            console.error('Error founded in bookslot service', error);
            throw error
        }
    }
}