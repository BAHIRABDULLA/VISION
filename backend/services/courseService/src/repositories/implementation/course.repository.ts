import ICourse from "../../interfaces/ICourse"
import { Course } from "../../models/course.model"
import { ICourseService } from "../../services/interface/ICourse.service"
import { ICourseRepository } from "../interface/ICourse.repository"
import { BaseRepository } from "./base.repository"

class CourseRepository extends BaseRepository<ICourse> implements ICourseRepository {
    async findByName(name: string): Promise<ICourse | null> {
        try {
            const course = await Course.findOne({ name })
            return course
        } catch (error) {
            console.error('Error founded in findbyname in repository',error);
        }   
        throw new Error("Method not implemented.")
    }
    

}
export default CourseRepository