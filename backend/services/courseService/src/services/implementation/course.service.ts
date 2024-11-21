import { Request } from "express";
import ICourse, { ICurriculum } from "../../interfaces/ICourse";
import { ICourseRepository } from "../../repositories/interface/ICourse.repository";
import { ICourseService } from "../interface/ICourse.service";
import { uploadFile } from "../../utils/file.upload";
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
    constructor(courseRepository: ICourseRepository) {
        this.courseRepository = courseRepository
    }
    async createCourse(data: courseData, imageFile?: Express.Multer.File): Promise<ICourse | null> {
        try {

            const checkCourse = await this.courseRepository.findByName(data.name)
            console.log(checkCourse, 'check cour se ');

            if (checkCourse) {
                return null
            }
            
            console.log(data.curriculum,'data.curriculum');
            
            let s3FileUrl = ''
            if (imageFile) {
                const fileContent = imageFile.buffer;
                const fileType = imageFile.mimetype;
                const fileName = `uploads/${Date.now()}_${imageFile.originalname}`;
                console.log(fileName, 'fileName');
                const result = await uploadFile(fileContent, fileName, fileType);

                if (!result) {
                    throw new Error('File upload failed');
                }
                s3FileUrl = result.Location
                console.log('Uploaded file URL:', s3FileUrl);

                data.image = s3FileUrl
            }
            const response = await this.courseRepository.create(data)
            console.log(response, 'response in create course');
            return response
        } catch (error) {
            console.error('Error founded in ', error);
            return null
        }
    }


    async getAllCourses() {
        try {
            const data = await this.courseRepository.findAll()
            // console.log(data, 'response ');

            return { success: true, message: 'Courses fetched successfully', data }
        } catch (error) {
            console.error('Error founded in ', error);
            return { success: false, message: 'Internal server error' }
        }
    }


    async getCourseById(id: string) {
        try {
            const findCourse = await this.courseRepository.findById(id)
            console.log(findCourse, 'find course ');

            if (!findCourse) {
                return { success: false, message: "Course not founded " }
            }
            return { success: true, message: "Course founded", course: findCourse }
        } catch (error) {
            console.error('Error founded in get course details in service', error);
            return { success: false, message: "Error retrieving course details" }
        }
    }


    async editCourseData(data: courseData,id:string, imageFile?: Express.Multer.File): Promise<ICourse | null>{
        try {
            const checkCourse = await this.courseRepository.findById(id)
            console.log(checkCourse, 'check cour se ');

            if (!checkCourse) {
                return null
            }
            console.log(imageFile,'image file file file ifle ');
            
            console.log(data.curriculum,'data.curriculum');
            
            let s3FileUrl = ''
            if (imageFile) {
                const fileContent = imageFile.buffer;
                const fileType = imageFile.mimetype;
                const fileName = `uploads/${Date.now()}_${imageFile.originalname}`;
                console.log(fileName, 'fileName');
                const result = await uploadFile(fileContent, fileName, fileType);

                if (!result) {
                    throw new Error('File upload failed');
                }
                s3FileUrl = result.Location
                console.log('Uploaded file URL:', s3FileUrl);

                data.image = s3FileUrl
            }
            console.log(data,'data data data in course service ');
            
            const response = await this.courseRepository.update(id,data)
            console.log(response, 'response in edit course service ');
            return response
        } catch (error) {
            console.error('Error founded in edit course data',error);
            return null

        }
    }

    async courseStatusUpdate(id:string,status:'active' | 'block'):Promise<ICourse | null>{
        try {
            console.log(status.toLowerCase(),id,'status,    id')
            const response = await this.courseRepository.update(id,{status})
            console.log(response,'response ');
            if(!response?.isModified){
                return null
            }
            return response
        } catch (error) {
            console.error('Error founded in course update service',error);
            return null
        }
    }

}