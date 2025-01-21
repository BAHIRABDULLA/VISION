import { CourseController } from "../controllers/course.controller";
import { ResourseController } from "../controllers/resource.controller";
import { Course } from "../models/course.model";
import Payment from "../models/payment.model";
import { Resource } from "../models/resource.model";
import CourseRepository from "../repositories/implementation/course.repository";
import { PaymentRepository } from "../repositories/implementation/payment.repository";
import ResourceRepository from "../repositories/implementation/resource.repository";
import { CourseService } from "../services/implementation/course.service";
import { PaymentService } from "../services/implementation/payment.service";
import { ResourceService } from "../services/implementation/resource.service";


const courseRepository = new CourseRepository(Course)
const resourceRepository = new ResourceRepository(Resource)
const paymentRepository = new PaymentRepository(Payment)

const courseService = new CourseService(courseRepository,paymentRepository)
const resourceService = new ResourceService(resourceRepository,courseRepository)
const paymentService = new PaymentService(paymentRepository)

const courseController = new CourseController(courseService)
const resourceController = new ResourseController(resourceService)

export { courseController, resourceController ,paymentService}