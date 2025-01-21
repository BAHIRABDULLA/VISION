import { IPayment } from "../../models/payment.model";
import { IBaseRepository } from "./IBase.repository";

export interface IPaymentRepository extends IBaseRepository<IPayment> {
    findByUserId(userId: string): Promise<IPayment | null>
}