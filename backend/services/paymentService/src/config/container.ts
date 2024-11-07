


import { PaymentController } from "../controllers/payment.controller";
import Payment from "../models/payment.model";
import { PaymentRepository } from "../repositories/implementations/payment.repository";
import { PaymentService } from "../services/implementation/payment.service";



const paymentRepository = new PaymentRepository(Payment)
const paymentService = new PaymentService(paymentRepository)
const paymentController = new PaymentController(paymentService)

export {paymentController}