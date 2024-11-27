import Payment, { IPayment } from "../../models/payment.model";
import { IPaymentRepository } from "../interface/IPayment.repository";
import BaseRepository from "./base.repository";
import { FilterQuery } from "mongoose";

export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository{
    async findOneAndUpdate(filter: FilterQuery<IPayment>, data: Partial<IPayment>):Promise<IPayment | null>{
        try {
            return await Payment.findOneAndUpdate(filter,data,{new:true})
        } catch (error) {
            console.error('Error founded in findone and update',error);
            return null
        }
    }
}