import { CourseController } from "../controllers/course.controller";
import { Course } from "../models/course.model";
import CourseRepository from "../repositories/implementation/course.repository";
import { CourseService } from "../services/implementation/course.service";


const courseRepository  = new CourseRepository(Course)
const courseService = new CourseService(courseRepository)
const courseController = new CourseController(courseService)

export {courseController}