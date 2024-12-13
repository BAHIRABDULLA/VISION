import { IPaymentService } from "../services/interface/IPayment.service";


export class PaymentController {
    private paymentService:IPaymentService
    constructor(paymentService:IPaymentService){
        this.paymentService = paymentService
    }
}