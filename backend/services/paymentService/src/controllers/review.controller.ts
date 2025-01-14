import { HttpStatus } from "../enums/http.status";
import { IReviewService } from "../services/interface/IReview.service";
import { NextFunction, Request,Response } from "express";
import { successResponse } from "../utils/response.helper";
import { JwtPayload } from "jsonwebtoken";

interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}

export class ReviewController {
    constructor(private reviewService:IReviewService ) {}

    async getReviewsByCourseId(req: Request, res: Response ,next:NextFunction) {
        try {
            const {courseId} = req.params
            const reviews = await this.reviewService.getReviewsByCourseId(courseId)
            return successResponse(res, HttpStatus.OK,"Course reviews found " ,{reviews})
        } catch (error) {
            console.error('Error founded in get reviews by course id', error);
            next(error)
        }
    }

    async createCourseReview(req: CustomeRequest, res: Response ,next:NextFunction) {
        try {
            const {courseId,rating,review} = req.body
            const user = req.user as JwtPayload
            const userId = user.id
            if(!userId) {
                return res.status(HttpStatus.UNAUTHORIZED).json({message:"Unauthorized"})
            }
            await this.reviewService.createCourseReview({courseId,rating,review,userId})
            return successResponse(res, HttpStatus.CREATED,"Course review created")
        } catch (error) {
            console.error('Error founded in create course review', error);
            next(error)
        }
    }
}