import mongoose, { Mongoose } from "mongoose";
import { IBooking } from "../../interface/IBooking";
import Slot from "../../model/slot.model";
import { BookingRepository } from "../../repositories/implementation/booking.repository";
import { SlotRepository } from "../../repositories/implementation/slot.repository";
import { ISlotService } from "../interface/ISlot.service";
import CustomError from "../../utils/custom.error";
import { HttpStatus } from "../../enums/http.status";
import { IPaymentRepository } from "../../repositories/interface/IPayment.repository";
import axios from "axios";



export class SlotService implements ISlotService {


    constructor(private slotRepository: SlotRepository,
        private bookingRepository: BookingRepository,
        private paymentRepository: IPaymentRepository) { }

    async createSlot(time: string, availableDays: string[], mentorId: string) {
        try {
            const response = await this.slotRepository.createOrUpdateSlots(time, availableDays, mentorId)
            // const response = await this.slotRepository.create(data)
            return response
        } catch (error) {
            throw error
        }
    }


    async getSlotByUser(userId: string) {
        try {
            const getSlots = await this.slotRepository.findMentorSlots(userId)
            return getSlots
        } catch (error) {
            throw error
        }
    }

    async removeSlot(mentorId: string, slotId: string) {
        try {
            const resposne = await this.slotRepository.removeSlotById(mentorId, slotId)
            return resposne
        } catch (error) {
            throw error
        }
    }


    async bookSlot(mentorId: string, menteeId: string, time: string, date: Date, token: string): Promise<IBooking | null> {
        try {


            const findAnyoneBookedSession = await this.bookingRepository.findByBookingData(mentorId, date, time)
            if (findAnyoneBookedSession) {
                throw new CustomError("Session already purchased ", HttpStatus.BAD_REQUEST)

            }
            const givenDate = new Date(date)
            const dayIndex = givenDate.getDay()
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayName = days[dayIndex]
            const checkSessionBooked = await this.paymentRepository.findByMenteeAndMentorId(menteeId, mentorId)
            if (!checkSessionBooked) {
                throw new CustomError('Please purchase any Mentorship plans', HttpStatus.NOT_FOUND)
            }
            if ((checkSessionBooked.type === 'mentorship_subscription' || checkSessionBooked.type === 'one_time_payment')
                && checkSessionBooked.sessionCount == 0) {
                throw new CustomError('Please purchase any Mentorship plans', HttpStatus.UNAUTHORIZED)
            }
            if (checkSessionBooked.type === 'mentorship_subscription' && checkSessionBooked.sessionCount > 4) {
                throw new CustomError('You already booked session', HttpStatus.CONFLICT)
            }
            if (checkSessionBooked.type === 'one_time_payment' && checkSessionBooked.sessionCount > 1) {
                throw new CustomError('You already booked session', HttpStatus.CONFLICT)
            }
            const today = new Date()
            const providedDate = new Date(date)
            if (providedDate < today) {
                throw new CustomError('Selected date cannot be in the past. Please choose a valid date', HttpStatus.UNAUTHORIZED)
            }
            const mentorSlots = await this.slotRepository.findMentorSlots(mentorId)
            if (!mentorSlots || mentorSlots.slots.length === 0) {
                throw new CustomError('There are no available slots for the mentor. Please try again', HttpStatus.NOT_FOUND)
            }
            const isSlotAvailable = mentorSlots.slots.some(slot => {
                const slotTime = slot.time
                return slot.availableDays.includes(dayName) && slotTime === time
            })
            if (!isSlotAvailable) {
                throw new CustomError('The selected date and time are not available . Please choose a valid slot', HttpStatus.CONFLICT)
            }

            const data: Partial<IBooking> = {
                mentorId: new mongoose.Types.ObjectId(mentorId),
                menteeId: new mongoose.Types.ObjectId(menteeId),
                date,
                time
            }
            const response = await this.bookingRepository.create(data)
            const sendDataToPaymentService = await axios.post('https://apivision.bahirabdulla.online/payment/booking/create',
                response,
                {
                    headers:
                        { Authorization: `Bearer ${token}` }
                }
            )
            
            return response
        } catch (error) {
            throw error
        }
    }

    async getBookingSlotDetails(bookingId: string) {
        try {

            const response = await this.bookingRepository.findById(bookingId)
            return response
        } catch (error) {
            throw error
        }
    }

    async getBookingSlot(userId: string, role: string): Promise<Partial<IBooking[]> | null> {
        try {

            const response = await this.bookingRepository.findByUserId(userId, role)
            return response
        } catch (error) {
            throw error
        }
    }
}