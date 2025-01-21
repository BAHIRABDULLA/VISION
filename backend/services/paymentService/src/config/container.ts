


import { BookingController } from "../controllers/booking.controller";
import { PaymentController } from "../controllers/payment.controller";
import { ReviewController } from "../controllers/review.controller";
import Booking from "../models/booking.model";
import bookingModel from "../models/booking.model";
import Payment from "../models/payment.model";
import { Review } from "../models/review.model";
import { BookingRepository } from "../repositories/implementations/booking.repository";
import { PaymentRepository } from "../repositories/implementations/payment.repository";
import { ReviewRepository } from "../repositories/implementations/review.repository";
import { BookingService } from "../services/implementation/booking.service";
import { PaymentService } from "../services/implementation/payment.service";
import { ReviewService } from "../services/implementation/review.service";



const paymentRepository = new PaymentRepository(Payment)
const reviewRepository = new ReviewRepository(Review)
const bookingRepository = new BookingRepository(Booking)


const paymentService = new PaymentService(paymentRepository,bookingRepository)
const reviewService = new ReviewService(reviewRepository)
const bookingService = new BookingService(bookingRepository)


const paymentController = new PaymentController(paymentService)
const reviewController = new ReviewController(reviewService)
const bookingController = new BookingController(bookingService)


export {paymentController,reviewController,bookingController}