import { HttpStatus } from "../enums/http.status";
import { IReviewService } from "../services/interface/IReview.service";
import { NextFunction, Request, response, Response } from "express";
import { successResponse } from "../utils/response.helper";
import { JwtPayload } from "jsonwebtoken";

interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}

export class ReviewController {
    constructor(private reviewService: IReviewService) { }

    async getReviewsBycourseIdOrMentorId(req: Request, res: Response, next: NextFunction) {
        try {
            const { courseIdOrMentorId } = req.params
            const {reviewType } = req.query
            if (reviewType !== 'course' && reviewType !== 'mentorship') {
                return res.status(400).json({ error: 'Invalid reviewType. Must be "course" or "mentorship".' });
            }        
            const reviews = await this.reviewService.getReviewsBycourseIdOrMentorId(
                courseIdOrMentorId,reviewType as 'course' | 'mentorship')
            return successResponse(res, HttpStatus.OK, "Course reviews found ", { reviews })
        } catch (error) {
            console.error('Error founded in get reviews by course id', error);
            next(error)
        }
    }

    async createReview(req: CustomeRequest, res: Response, next: NextFunction) {
        try {
            const { courseIdOrMentorId, rating, review, reviewType } = req.body
            const user = req.user as JwtPayload
            const userId = user.id
            if (!userId) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" })
            }
            let response 
            if(reviewType=='course'){
               response = await this.reviewService.createReview({ courseId:courseIdOrMentorId, rating, review, userId, reviewType })
            }else{
                response = await this.reviewService.createReview({ mentorId:courseIdOrMentorId, rating, review, userId, reviewType })
            }
            return successResponse(res, HttpStatus.CREATED, "Course review created",{newReview:response})
        } catch (error) {
            console.error('Error founded in create course review', error);
            next(error)
        }
    }
}