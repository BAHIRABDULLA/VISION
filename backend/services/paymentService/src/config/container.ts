


import { BookingController } from "../controllers/booking.controller";
import { PaymentController } from "../controllers/payment.controller";
import { ReviewController } from "../controllers/review.controller";
import Booking from "../models/booking.model";
import Payment from "../models/payment.model";
import { Review } from "../models/review.model";
import { User } from "../models/user.model";
import { BookingRepository } from "../repositories/implementations/booking.repository";
import { PaymentRepository } from "../repositories/implementations/payment.repository";
import { ReviewRepository } from "../repositories/implementations/review.repository";
import { UserRepository } from "../repositories/implementations/user.repository";
import { BookingService } from "../services/implementation/booking.service";
import { PaymentService } from "../services/implementation/payment.service";
import { ReviewService } from "../services/implementation/review.service";
import { UserService } from "../services/implementation/user.service";


const paymentRepository = new PaymentRepository(Payment)
const reviewRepository = new ReviewRepository(Review)
const bookingRepository = new BookingRepository(Booking)
const userRepository = new UserRepository(User)


const paymentService = new PaymentService(paymentRepository, bookingRepository)
const reviewService = new ReviewService(reviewRepository,paymentRepository)
const bookingService = new BookingService(bookingRepository)
const userService = new UserService(userRepository)


const paymentController = new PaymentController(paymentService)
const reviewController = new ReviewController(reviewService)
const bookingController = new BookingController(bookingService)


export { paymentController, reviewController, bookingController, userService }