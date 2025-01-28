import { Model } from "mongoose";
import { IPayment } from "../../models/payment.model";
import { IPaymentRepository } from "../interface/IPayment.repository";
import { BaseRepository } from "./base.repository";

export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    constructor(model: Model<IPayment>) {
        super(model);
    }
   async findBoughtCoursesByUserId(userId: string,type:string,status:'pending'|'completed'): Promise<IPayment[] | null> {
      try {         
         const payment = await this.model.find({ menteeId:userId ,type,status}).populate('courseId')
         return payment;
      } catch (error) {
         return null;
      }
   }
}