import ICourse from "../../interfaces/ICourse"
import { Course } from "../../models/course.model"
import { ICourseService } from "../../services/interface/ICourse.service"
import { ICourseRepository } from "../interface/ICourse.repository"
import { BaseRepository } from "./base.repository"

class CourseRepository extends BaseRepository<ICourse> implements ICourseRepository {
    async findByName(name: string): Promise<ICourse | null> {
        try {
            const course = await Course.findOne({ name :{ $regex: new RegExp(`^${name}$`, 'i')}})
            return course
        } catch (error) {
            throw error
        }   
    }

}
export default CourseRepository