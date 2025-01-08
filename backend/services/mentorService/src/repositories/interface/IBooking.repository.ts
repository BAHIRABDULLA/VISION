import { IBooking } from "../../interface/IBooking";
import { IBaseRepository } from "./IBase.repository";



export interface IBookingRepository  extends IBaseRepository<IBooking>{
    findByBookingData(mentorId:string,date:Date,time:string):Promise<IBooking | null>
    findBookingDataWithMentorId(mentorId:string):Promise<IBooking[] | null>
    findByUserId(userId:string,role:string):Promise<IBooking[] | null>
}