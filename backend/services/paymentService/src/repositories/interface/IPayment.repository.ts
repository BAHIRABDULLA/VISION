import { IPayment } from "../../models/payment.model";
import { IBaseRepository } from "./IBase.repository";
import { FilterQuery } from "mongoose";


export interface IPaymentRepository extends IBaseRepository<IPayment> {
    findOneAndUpdate(filter: FilterQuery<IPayment>, data: Partial<IPayment>): Promise<IPayment | null>;
    findOne(filter:FilterQuery<IPayment>):Promise<IPayment | null>
    findUserBoughtSession(menteeId:string):Promise<IPayment | null>

    findIsUserBoughtCourse(courseId:string,menteeId:string):Promise<IPayment | null>
}