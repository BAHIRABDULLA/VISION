import ICourse from "../../interfaces/ICourse";
import { ICourseRepository } from "../../repositories/interface/ICourse.repository";
import { ICourseService } from "../interface/ICourse.service";
interface courseData {
    name: string
    duration: string
    overview: string
    curriculum: string
    price: number
    image?: string
}


export class CourseService implements ICourseService {

    private courseRepository: ICourseRepository
    constructor(courseRepository: ICourseRepository) {
        this.courseRepository = courseRepository
    }
    async createCourse(data: courseData) {
        try {
            const checkCourse = await this.courseRepository.findByName(data.name)
            console.log(checkCourse, 'check cour se ');

            if (checkCourse) {
                // throw new Error('Course already exist')
                return { success: false, message: 'Course already exist' }
            }
            const response = await this.courseRepository.create(data)
            console.log(response, 'response in create course');
            return { success: true, message: 'Course created successfully' }

        } catch (error) {
            console.error('Error founded in ', error);
            return { success: false, message: 'Internal server error' }
        }
    }


    async getAllCourses() {
        try {
            const data = await this.courseRepository.findAll()
            console.log(data,'response ');
            
            return { success: true, message: 'Courses fetched successfully',data }
        } catch (error) {
            console.error('Error founded in ', error);
            return { success: false, message: 'Internal server error' }
        }
    }


    async getCourseById(id:string){
        try {
            const findCourse = await this.courseRepository.findById(id)
            console.log(findCourse,'find course ');
            
            if(!findCourse){
                return {success:false,message:"Course not founded "}
            }
            return {success:true,message:"Course founded",course:findCourse}
        } catch (error) {
            console.error('Error founded in get course details in service',error);
            return {success:false,message:"Error retrieving course details"}
        }
    }

}