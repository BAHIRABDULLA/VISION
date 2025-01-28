import { IPaymentRepository } from "../../repositories/interface/IPayment.repository";
import { IPaymentService } from "../interface/IPayment.service";

export class PaymentService implements IPaymentService {

    constructor(private paymentRepository: IPaymentRepository) {}

    async savePaymentData(data:object){
        try {
            const response = await this.paymentRepository.create(data)
            return null
        } catch (error) {
            return error
        }
    }
}