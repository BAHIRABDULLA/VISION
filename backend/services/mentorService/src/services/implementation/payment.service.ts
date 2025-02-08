import { log } from "node:console";
import { IPaymentRepository } from "../../repositories/interface/IPayment.repository";
import { IPaymentService } from "../interface/IPayment.service";
import { IBookingRepository } from "../../repositories/interface/IBooking.repository";
import { IUserRepository } from "../../repositories/interface/IUser.repository";

interface IPaymentData {
    userEmail: string;
    amount: number;
    status: 'pending' | 'completed';
    type: 'course_purchase' | 'mentorship_subscription' | 'one_time_payment';
    courseId?: string;
    menteeId:string;
    mentorId?: string;
    sessionCount: number;
    createdAt: Date;
}

export class PaymentService implements IPaymentService {
    constructor(private paymentRepository: IPaymentRepository,private bookingRepository:IBookingRepository
        ,private userRepository:IUserRepository
    ) { }


    async savePaymentData(data:IPaymentData): Promise<null> {
        try {
            console.log('its herer in save payment data ');
            
            const response = await this.paymentRepository.create(data)
            let count = 0
            if(data.type=='mentorship_subscription'){
              count = 4
    
            }else if(data.type=='one_time_payment'){
               count = 1
            }
            const user = await this.userRepository.findById(data.menteeId)
            if(!user){
                return null
            }
            if(user.sessionCount){
                count = user.sessionCount + count
            }
            await this.userRepository.update(data.menteeId,{sessionCount:count})
            console.log(response,'response in save payment data ');
            return null
        } catch (error) {
            return null
        }
    }

}