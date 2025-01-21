import { IBooking } from "../../interfaces/IBooking";
import { IBaseRepository } from "./IBase.repository";

export interface IBookingRepository extends IBaseRepository<IBooking> {
    findUserBookedSession(menteeId: string, mentorId: string): Promise<IBooking | null>
}