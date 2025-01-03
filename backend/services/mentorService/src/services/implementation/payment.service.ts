import { log } from "node:console";
import { IPaymentRepository } from "../../repositories/interface/IPayment.repository";
import { IPaymentService } from "../interface/IPayment.service";
import { IBookingRepository } from "../../repositories/interface/IBooking.repository";


export class PaymentService implements IPaymentService {
    constructor(private paymentRepository: IPaymentRepository,private bookingRepository:IBookingRepository) { }


    async savePaymentData(data:object){
        try {
            const response = await this.paymentRepository.create(data)
            console.log(response,'response in save payment data ');
            return null
        } catch (error) {
            console.error('Error founded in save payment data',error);
        }
    }

}