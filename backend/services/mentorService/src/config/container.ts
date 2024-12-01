import { MentorController } from "../controllers/mentor.controller";
import { SlotController } from "../controllers/slot.controller";
import bookingModel from "../model/booking.model";
import { Mentor } from "../model/mentor.model";
import slotModel from "../model/slot.model";
import { User } from "../model/user.model";
import { BookingRepository } from "../repositories/implementation/booking.repository";
import { MentorRepository } from "../repositories/implementation/mentor.repository";
import { SlotRepository } from "../repositories/implementation/slot.repository";
import { UserRepository } from "../repositories/implementation/user.repository";
import { MentorService } from "../services/implementation/mentor.service";
import { SlotService } from "../services/implementation/slot.service";



const mentorRepository = new MentorRepository(Mentor)
const userRepository = new UserRepository(User)
const slotRepository = new SlotRepository(slotModel)
const bookingRepository = new BookingRepository(bookingModel)


const mentorService = new MentorService(mentorRepository,userRepository,slotRepository)
const slotService = new SlotService(slotRepository,bookingRepository)


const mentorController = new MentorController(mentorService)
const slotController = new SlotController(slotService)

export {mentorService,mentorController,slotController}