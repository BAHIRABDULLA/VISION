import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}


export interface ICourseController {
    createCourse(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllCourses(req: Request, res: Response, next: NextFunction): Promise<void>
    getCourseDetails(req: Request, res: Response, next: NextFunction): Promise<void>
    editCourse(req: Request, res: Response, next: NextFunction): Promise<void>
    editCourseStatus(req: Request, res: Response, next: NextFunction): Promise<void>
    getPurchasedCourses(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>
}