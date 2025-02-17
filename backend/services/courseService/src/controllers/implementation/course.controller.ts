import { HttpStatus } from "../../enums/http.status";
import { ICourseService } from "../../services/interface/ICourse.service";
import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/response.helper";
import { JwtPayload } from "jsonwebtoken";
import { ICourseController } from "../interface/ICourse.controller";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants";


export interface ParamsData {
    search: string;
    page: number;
    limit: number
}


interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}


export class CourseController implements ICourseController {
    private courseService: ICourseService;
    constructor(courseService: ICourseService) {
        this.courseService = courseService
    }

    async createCourse(req: Request, res: Response, next: NextFunction) {
        try {

            const { name, duration, overview, price,image, curriculum } = req.body
            const data = { name, duration, overview, price, curriculum: JSON.parse(curriculum) }

            const file = req.file
            console.log(file,'file in create course');
            
            const response = await this.courseService.createCourse(data,file)
            console.log(response,'response in create coruse');
            
            if (!response) {
                return errorResponse(res, HttpStatus.CONFLICT, ERROR_MESSAGES.INVALID_CREADENTIALS)
            }
            return successResponse(res, HttpStatus.CREATED, SUCCESS_MESSAGES.COURSE_CREATED, response)
        } catch (error) {
            next(error)
        }
    }

    async getAllCourses(req: Request, res: Response, next: NextFunction) {
        try {

            const response = await this.courseService.getAllCourses()
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.ALL_COURSES_FETCHED, response)
        } catch (error) {
            next(error)
        }
    }


    async getCourseDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const response = await this.courseService.getCourseById(id)
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.COURSE_DETAILS_FETCHED, response)
        } catch (error) {
            next(error)
        }
    }


    async getAllCoursesWithParams(req:Request,res:Response,next:NextFunction) {
        try {
            const { search = '',  page = '1', limit = '' } = req.query;
            const params: ParamsData = {
                search: search as string,
                page: parseInt(page as string, 10),
                limit: parseInt(limit as string, 10),
            }

            const response = await this.courseService.getAllCoursesWithParams(params)
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.ALL_COURSES_FETCHED, response)
        } catch (error) {
            next(error)
        }
    }

    async editCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const { name, duration, overview, price,image, curriculum } = req.body

            const data = { name, duration, overview, price,image, curriculum: JSON.parse(curriculum) }
            const response = await this.courseService.editCourseData(data, id, req.file)
            if (!response) {
                return errorResponse(res, HttpStatus.NOTFOUND, ERROR_MESSAGES.COURSE_NOT_FOUND)
            }
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.COURSE_UPDATED, response)
        } catch (error) {
            next(error)
        }
    }


    async editCourseStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const courseId = req.params.id
            const { status } = req.body

            const response = await this.courseService.courseStatusUpdate(courseId, status)
            if (!response) {
                return errorResponse(res, HttpStatus.NOTFOUND, ERROR_MESSAGES.ERROR_UPDATING_STATUS)
            }
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.COURSE_UPDATED, response)
        } catch (error) {
            next(error)
        }
    }


    async getPurchasedCourses(req: CustomeRequest, res: Response, next: NextFunction) {
        try {

            const user = req.user as JwtPayload
            const userId = user.id
            const response = await this.courseService.getPurchasedCourses(userId)
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.PURCHASED_COURSE_FETCHED, { response })
        } catch (error) {
            next(error)
        }
    }
}