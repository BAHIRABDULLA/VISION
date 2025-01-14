


import { PaymentController } from "../controllers/payment.controller";
import { ReviewController } from "../controllers/review.controller";
import Payment from "../models/payment.model";
import { Review } from "../models/review.model";
import { PaymentRepository } from "../repositories/implementations/payment.repository";
import { ReviewRepository } from "../repositories/implementations/review.repository";
import { PaymentService } from "../services/implementation/payment.service";
import { ReviewService } from "../services/implementation/review.service";



const paymentRepository = new PaymentRepository(Payment)
const paymentService = new PaymentService(paymentRepository)
const paymentController = new PaymentController(paymentService)

const reviewRepository = new ReviewRepository(Review)
const reviewService = new ReviewService(reviewRepository)
const reviewController = new ReviewController(reviewService)


export {paymentController,reviewController}