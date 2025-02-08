import { IPayment } from "../../interfaces/IPayment";
import { IBaseRepository } from "./IBase.repository";
import { FilterQuery } from "mongoose";


export interface IPaymentRepository extends IBaseRepository<IPayment> {
    findOneAndUpdate(filter: FilterQuery<IPayment>, data: Partial<IPayment>): Promise<IPayment | null>;
    findOne(filter: FilterQuery<IPayment>): Promise<IPayment | null>
    findUserBoughtPlans(menteeId: string): Promise<IPayment | null>
    findIsUserBoughtCourse(courseId: string, menteeId: string): Promise<IPayment | null>
    findUserPayments(userId: string, role: 'mentee' | 'mentor'): Promise<IPayment[] | null>
}