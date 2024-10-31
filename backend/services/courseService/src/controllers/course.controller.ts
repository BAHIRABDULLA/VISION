import { HttpStatus } from "../enums/http.status";
import { ICourseService } from "../services/interface/ICourse.service";
import { Request, Response } from "express";
import { uploadFile } from "../utils/file.upload";
import ICourse from "../interfaces/ICourse";


interface courseData {
    name: string
    duration: string
    overview: string
    curriculum: string
    price: number
    image?: string
}


export class CourseController {
    private courseService: ICourseService;
    constructor(courseService:ICourseService){
       this.courseService=courseService
    }

    async createCourse(req:Request,res:Response){
        try {

            console.log('*******');
            
            console.log(req.body,'req.body ');
            const {name,duration,overview,curriculum,price}=req.body
            console.log(name,duration,overview,curriculum,price,'_________');
            const data:courseData = { name,duration,overview,curriculum,price}
            let s3FileUrl = ''
            if (req.file) {
                const file = req.file
                console.log(file,'file');
                
                const fileContent = file.buffer;
                const fileType = file.mimetype;
                const fileName = `uploads/${Date.now()}_${file.originalname}`;
                console.log(fileName,'fileName');
                const result = await uploadFile(fileContent, fileName, fileType);
                if(!result){
                    return res.status(HttpStatus.NOTFOUND).json({success:false,message:''})
                }
                s3FileUrl = result.Location
                console.log('Uploaded file URL:', s3FileUrl);

                data.image = s3FileUrl
            }
            const response = await this.courseService.createCourse(data)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in create course',error);
        }
    }

    async getAllCourses(req:Request,res:Response){  
        try {
            const response = await this.courseService.getAllCourses()   
            return res.json(response)
        } catch (error) {
            console.error('Error founded in get all courses',error);
        }
    }


    async getCourseDetails(req:Request,res:Response) {
        try {
            const {id} = req.params
            console.log(id,'id in course controller ')
            const response = await this.courseService.getCourseById(id)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in get course details',error);
        }
    }
}