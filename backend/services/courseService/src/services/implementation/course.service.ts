import ICourse, { ICurriculum } from "../../interfaces/ICourse";
import { ICourseRepository } from "../../repositories/interface/ICourse.repository";
import { ICourseService } from "../interface/ICourse.service";
import { uploadFile } from "../../utils/file.upload";
import { IPaymentRepository } from "../../repositories/interface/IPayment.repository";
import { IPayment } from "../../models/payment.model";
interface courseData {
    _id:string
    name: string
    duration: string
    overview: string
    curriculum: ICurriculum[]
    price: number
    image?: string
}


export class CourseService implements ICourseService {

    private courseRepository: ICourseRepository
    private paymentRepository: IPaymentRepository
    constructor(courseRepository: ICourseRepository,paymentRepository:IPaymentRepository) {
        this.courseRepository = courseRepository
        this.paymentRepository = paymentRepository
    }
    async createCourse(data: courseData, imageFile?: Express.Multer.File): Promise<ICourse | null> {
        try {

            const checkCourse = await this.courseRepository.findByName(data.name)
            if (checkCourse) {
                return null
            }
                        
            let s3FileUrl = ''
            if (imageFile) {
                const fileContent = imageFile.buffer;
                const fileType = imageFile.mimetype;
                const fileName = `uploads/${Date.now()}_${imageFile.originalname}`;
                const result = await uploadFile(fileContent, fileName, fileType);

                if (!result) {
                    throw new Error('File upload failed');
                }
                s3FileUrl = result.Location

                data.image = s3FileUrl
            }
            const response = await this.courseRepository.create(data)
            return response
        } catch (error) {
            return null
        }
    }


    async getAllCourses() {
        try {
            const data = await this.courseRepository.findAll()

            return { success: true, message: 'Courses fetched successfully', data }
        } catch (error) {
            return { success: false, message: 'Internal server error' }
        }
    }


    async getCourseById(id: string) {
        try {
            
            const findCourse = await this.courseRepository.findById(id)

            if (!findCourse) {
                return { success: false, message: "Course not founded " }
            }
            return { success: true, message: "Course founded", course: findCourse }
        } catch (error) {
            return { success: false, message: "Error retrieving course details" }
        }
    }


    async editCourseData(data: courseData,id:string, imageFile?: Express.Multer.File): Promise<ICourse | null>{
        try {
            const checkCourse = await this.courseRepository.findById(id)

            if (!checkCourse) {
                return null
            }
            
            let s3FileUrl = ''
            if (imageFile) {
                const fileContent = imageFile.buffer;
                const fileType = imageFile.mimetype;
                const fileName = `uploads/${Date.now()}_${imageFile.originalname}`;
                const result = await uploadFile(fileContent, fileName, fileType);

                if (!result) {
                    throw new Error('File upload failed');
                }
                s3FileUrl = result.Location

                data.image = s3FileUrl
            }
            
            const response = await this.courseRepository.update(id,data)
            return response
        } catch (error) {
            return null

        }
    }

    async courseStatusUpdate(id:string,status:'active' | 'block'):Promise<ICourse | null>{
        try {
            const response = await this.courseRepository.update(id,{status})
            if(!response?.isModified){
                return null
            }
            return response
        } catch (error) {
            return null
        }
    }

    async getPurchasedCourses(userId:string):Promise<IPayment[] | null>{
        try {

            const findBoughtCourseByUserId = await this.paymentRepository.findBoughtCoursesByUserId(userId,'course_purchase','completed')            
            return findBoughtCourseByUserId
        } catch (error) {
            return null
        }
    }

}