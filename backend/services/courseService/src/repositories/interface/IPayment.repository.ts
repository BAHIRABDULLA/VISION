import { IPayment } from "../../models/payment.model";
import { IBaseRepository } from "./IBase.repository";

export interface IPaymentRepository extends IBaseRepository<IPayment> {
    findBoughtCoursesByUserId(userId: string,type:string,status:'pending'|'completed'): Promise<IPayment[] | null>
}