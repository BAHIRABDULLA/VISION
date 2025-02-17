import { HttpStatus } from "../../enums/http.status";
import { IReviewService } from "../../services/interface/IReview.service";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/response.helper";
import { JwtPayload } from "jsonwebtoken";
import { IReviewController } from "../interface/IReview.controller";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constant";

interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}

export class ReviewController implements IReviewController {
    constructor(private reviewService: IReviewService) { }

    async getReviewsBycourseIdOrMentorId(req: Request, res: Response, next: NextFunction) {
        try {
            const { courseIdOrMentorId } = req.params
            const { reviewType } = req.query
            if (reviewType !== 'course' && reviewType !== 'mentorship') {
                res.status(400).json({ error: 'Invalid reviewType. Must be "course" or "mentorship".' });
                return
            }
            const reviews = await this.reviewService.getReviewsBycourseIdOrMentorId(
                courseIdOrMentorId, reviewType as 'course' | 'mentorship')
            successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.COURSE_REVIEWS_FETCHED, { reviews })
        } catch (error) {
            next(error)
        }
    }

    async createReview(req: CustomeRequest, res: Response, next: NextFunction) {
        try {
            const { courseIdOrMentorId, rating, review, reviewType } = req.body
            const user = req.user as JwtPayload
            const userId = user.id
            if (!userId) {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: ERROR_MESSAGES.ACCESS_DENIED})
                return
            }
            let response
            if (reviewType == 'course') {
                response = await this.reviewService.createReview({ courseId: courseIdOrMentorId, rating, review, userId, reviewType })
            } else {
                response = await this.reviewService.createReview({ mentorId: courseIdOrMentorId, rating, review, userId, reviewType })
            }
            successResponse(res, HttpStatus.CREATED, SUCCESS_MESSAGES.COURSE_CREATED, { newReview: response })
        } catch (error) {
            next(error)
        }
    }

    async getTopReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.reviewService.getTopReviews()
            successResponse(res, HttpStatus.OK, 'Reviews fetched', { reviews: response })
        } catch (error) {
            next(error)
        }
    }

    async getTotalReview(req:Request,res:Response,next:NextFunction){
        try {            
            const response  = await this.reviewService.getTotalReview()
            successResponse(res,HttpStatus.OK,"Total review count sent",{reviewCount:response})
        } catch (error) {
            next(error)
        }
    }
}