import { IPayment } from "../../model/payment.model";
import { IBaseRepository } from "./IBase.repository";


export interface IPaymentRepository extends IBaseRepository<IPayment>{
    findByMenteeAndMentorId(menteeId:string,mentorId:string):Promise<IPayment | null>
}