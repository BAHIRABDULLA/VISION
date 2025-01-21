import { Model } from "mongoose";
import { IPayment } from "../../models/payment.model";
import { IPaymentRepository } from "../interface/IPayment.repository";
import { BaseRepository } from "./base.repository";

export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    constructor(model: Model<IPayment>) {
        super(model);
    }
   async findByUserId(userId: string): Promise<IPayment | null> {
      try {
         const payment = await this.model.findOne({ userId });
         return payment;
      } catch (error) {
         console.error("Error founded in findByUserId", error);
         return null;
      }
   }
}