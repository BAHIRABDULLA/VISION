import { IBooking } from "../../interface/IBooking";
import { IBookingRepository } from "../interface/IBooking.repository";
import { BaseRepository } from "./base.repository";


export class BookingRepository extends BaseRepository<IBooking> implements IBookingRepository {

    
}