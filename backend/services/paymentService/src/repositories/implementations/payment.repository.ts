import { IPayment } from "../../interfaces/IPayment";
import Payment from "../../models/payment.model";
import { IPaymentRepository } from "../interface/IPayment.repository";
import BaseRepository from "./base.repository";
import { FilterQuery } from "mongoose";

export class PaymentRepository extends BaseRepository<IPayment> implements IPaymentRepository {
    async findOneAndUpdate(filter: FilterQuery<IPayment>, data: Partial<IPayment>): Promise<IPayment | null> {
        try {
            return await Payment.findOneAndUpdate(filter, data, { new: true })
        } catch (error) {
            return null
        }
    }

    async findOne(filter: FilterQuery<IPayment>): Promise<IPayment | null> {
        try {

            const response = await Payment.findOne(filter)
            return response
        } catch (error) {
            return null
        }
    }

    async findUserBoughtPlans(menteeId: string): Promise<IPayment | null> {
        try {
            const response = await Payment.findOne({
                menteeId,
                $or: [
                    { type: 'one_time_payment' },
                    { type: 'mentorship_subscription' }
                ],
                // status:'completed'
            })
            return response
        } catch (error) {
            return null
        }
    }

    async findIsUserBoughtCourse(courseId: string, menteeId: string) {
        try {
            const response = await Payment.findOne({
                menteeId,
                type: 'course_purchase',
                courseId,
                status: 'completed'
            })
            return response
        } catch (error) {
            return null
        }
    }


    async findUserPayments(userId: string, role: 'mentee' | 'mentor'): Promise<IPayment[] | null> {
        try {
            const filter = role === 'mentor' ? { mentorId: userId } : { menteeId: userId };
            const response = await Payment.find(filter);
            return response;
        } catch (error) {
            throw error
        }
    }


}