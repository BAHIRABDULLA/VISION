import { IPayment } from "../../interfaces/IPayment";
import Payment from "../../models/payment.model";
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

    async findOne(filter:FilterQuery<IPayment>):Promise<IPayment | null>{
        try {
            
            const response =  await Payment.findOne(filter)
            return response
        } catch (error) {
            console.error('Error founded IN find one ',error);
            return null
        }
    }

    async findUserBoughtPlans(menteeId:string):Promise<IPayment | null>{
        try {
            const response  = await Payment.findOne({
                menteeId,
                $or:[
                    {type:'one_time_payment'},
                    {type:'mentorship_subscription'}
                ],
                // status:'completed'
            })
            return response
        } catch (error) {
            console.error('Error founded in find user bouth session',error);
            return null
        }
    }

    async findIsUserBoughtCourse(courseId:string,menteeId:string){
        try {
            const response = await Payment.findOne({
                menteeId,
                type:'course_purchase',
                courseId,
                status:'completed'
            })
            return response
        } catch (error) {
            console.error('Error founded in find is use boughht course',error);
            return null
        }
    }
}