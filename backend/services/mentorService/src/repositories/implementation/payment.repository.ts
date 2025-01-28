import Payment, { IPayment } from "../../model/payment.model";
import { IPaymentRepository } from "../interface/IPayment.repository";
import { BaseRepository } from "./base.repository";


export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository{
    async findByMenteeAndMentorId(menteeId:string,mentorId:string){
        try {
            const response = await Payment.findOne({menteeId,mentorId})
            return response
        } catch (error) {
            throw error
        }
    }
}