
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}


export interface IReviewController {
    getReviewsBycourseIdOrMentorId(req: Request, res: Response, next: NextFunction): Promise<void>
    createReview(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>
}