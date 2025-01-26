import { MentorController } from "../controllers/mentor.controller";
import { PaymentController } from "../controllers/payment.controller";
import { SlotController } from "../controllers/slot.controller";
import bookingModel from "../model/booking.model";
import Category from "../model/category.model";
import { Mentor } from "../model/mentor.model";
import Payment from "../model/payment.model";
import slotModel from "../model/slot.model";
import { User } from "../model/user.model";
import { BookingRepository } from "../repositories/implementation/booking.repository";
import { CategoryRepository } from "../repositories/implementation/category.repository";
import { MentorRepository } from "../repositories/implementation/mentor.repository";
import { PaymentRepository } from "../repositories/implementation/payment.repository";
import { SlotRepository } from "../repositories/implementation/slot.repository";
import { UserRepository } from "../repositories/implementation/user.repository";
import { MentorService } from "../services/implementation/mentor.service";
import { PaymentService } from "../services/implementation/payment.service";
import { SlotService } from "../services/implementation/slot.service";



const mentorRepository = new MentorRepository(Mentor)
const userRepository = new UserRepository(User)
const slotRepository = new SlotRepository(slotModel)
const bookingRepository = new BookingRepository(bookingModel)
const paymentRepository = new PaymentRepository(Payment)
const categoryRepository  = new CategoryRepository(Category)


const mentorService = new MentorService(mentorRepository,userRepository,slotRepository,bookingRepository,categoryRepository)
const slotService = new SlotService(slotRepository,bookingRepository,paymentRepository)
const paymentService = new PaymentService(paymentRepository,bookingRepository)

const mentorController = new MentorController(mentorService)
const slotController = new SlotController(slotService)
const paymentController = new PaymentController(paymentService)

export {mentorService,paymentService,mentorController,slotController}