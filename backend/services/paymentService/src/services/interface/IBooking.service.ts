import { IBooking } from "../../interfaces/IBooking";


export interface IBookingService {
    createBookingData(data:object):Promise<IBooking | null>
}