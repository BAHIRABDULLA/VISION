import { IBooking } from "../../interface/IBooking"
import { ISlot } from "../../model/slot.model"


export interface ISlotService {
    createSlot(time: string, availableDays: string[], mentorId: string): Promise<ISlot | null>
    getSlotByUser(userId: string): Promise<ISlot | null>
    removeSlot(mentorId: string, slotId: string): Promise<any>
    bookSlot(mentorId: string, menteeId: string, time: string, date: Date): Promise<any>
    getBookingSlotDetails(bookingId: string): Promise<IBooking | null>
    getBookingSlot(userId: string, role: string): Promise<Partial<IBooking[]> | null>
}