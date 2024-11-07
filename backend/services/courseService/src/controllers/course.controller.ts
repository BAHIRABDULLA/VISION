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
           
            const {name,duration,overview,price,curriculum} = req.body
            const data = {name,duration,overview,price,curriculum:JSON.parse(curriculum)}
           
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
            console.log(id, 'id in course controller ')
            const response = await this.courseService.getCourseById(id)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in get course details', error);
        }
    }
}