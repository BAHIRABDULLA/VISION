import { HttpStatus } from "../enums/http.status";
import { ICourseService } from "../services/interface/ICourse.service";
import { NextFunction, Request, Response } from "express";
import { uploadFile } from "../utils/file.upload";
import ICourse from "../interfaces/ICourse";
import { errorResponse, successResponse } from "../utils/response.helper";


// interface courseData {
//     name: string
//     duration: string
//     overview: string
//     curriculum: string
//     price: number
//     image?: string
// }


export class CourseController {
    private courseService: ICourseService;
    constructor(courseService: ICourseService) {
        this.courseService = courseService
    }

    async createCourse(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body, 'req.body ');

            const { name, duration, overview, price, curriculum } = req.body
            const data = { name, duration, overview, price, curriculum: JSON.parse(curriculum) }

            const response = await this.courseService.createCourse(data, req.file)
            if (!response) {
                return errorResponse(res, HttpStatus.CONFLICT, "course already existed")
            }
            return successResponse(res, HttpStatus.OK, "Course successfully created", response)
        } catch (error) {
            console.error('Error founded in create course', error);
            next(error)
        }
    }

    async getAllCourses(req: Request, res: Response) {
        try {
            
            const response = await this.courseService.getAllCourses()
            // console.log(response,'response in get all coiurse');
            return res.json(response)
        } catch (error) {
            console.error('Error founded in get all courses', error);
        }
    }


    async getCourseDetails(req: Request, res: Response) {
        try {
            const { id } = req.params
            console.log(id, 'id in course controller ')
            const response = await this.courseService.getCourseById(id)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in get course details', error);
        }
    }


    async editCourse(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { name, duration, overview, price, curriculum } = req.body
            console.log(name,'name',duration,'duration',price,'price',overview,'overview')
            console.log(curriculum,'curriculum here edi course controller')
            console.log(JSON.parse(curriculum));
            
            const data = { name, duration, overview, price, curriculum: JSON.parse(curriculum) }
            const response = await this.courseService.editCourseData(data, id, req.file)
            if(!response){
                return errorResponse(res,HttpStatus.NOTFOUND,"Course already existed")
            }
            return successResponse(res,HttpStatus.OK,"Course successfully updated",response)
        } catch (error) {
            console.error('error founded in edit course',error);

        }
    }


    async editCourseStatus(req:Request,res:Response,next:NextFunction){
        try {
            const courseId = req.params.id
            const {status} = req.body
            console.log(req.body,'req.body');
            
            console.log(status,'status in course controlelr')
            console.log(courseId,'course id in edit course status course controler');
            const response = await this.courseService.courseStatusUpdate(courseId,status)
            if(!response){
                return errorResponse(res,HttpStatus.NOTFOUND,"There is an issue to update status")
            }
            return successResponse(res,HttpStatus.OK,"Status updated",response)
        } catch (error) {
            console.error('Error founded in edit course controller',error);
            next(error)
        }
    }
}