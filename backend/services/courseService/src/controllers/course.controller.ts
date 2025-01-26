import { HttpStatus } from "../enums/http.status";
import { ICourseService } from "../services/interface/ICourse.service";
import { NextFunction, Request, Response } from "express";
import { uploadFile } from "../utils/file.upload";
import ICourse from "../interfaces/ICourse";
import { errorResponse, successResponse } from "../utils/response.helper";
import { JwtPayload } from "jsonwebtoken";



interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}
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
            return res.json(response)
        } catch (error) {
            console.error('Error founded in get all courses', error);
        }
    }


    async getCourseDetails(req: Request, res: Response) {
        try {
            const { id } = req.params
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


    async getPurchasedCourses(req:CustomeRequest,res:Response,next:NextFunction){
        try {

            const user = req.user as JwtPayload
            const userId = user.id
            const response = await this.courseService.getPurchasedCourses(userId)
            return successResponse(res,HttpStatus.OK,"Purchased courses fetched",{response})
        } catch (error) {
            console.error('Error founded in get purchased courses controller',error);
            next(error)
        }
    }
}