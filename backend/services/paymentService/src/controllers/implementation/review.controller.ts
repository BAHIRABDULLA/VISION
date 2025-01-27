import { HttpStatus } from "../../enums/http.status";
import { IReviewService } from "../../services/interface/IReview.service";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/response.helper";
import { JwtPayload } from "jsonwebtoken";
import { IReviewController } from "../interface/IReview.controller";

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
            successResponse(res, HttpStatus.OK, "Course reviews found ", { reviews })
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
                res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" })
                return
            }
            let response
            if (reviewType == 'course') {
                response = await this.reviewService.createReview({ courseId: courseIdOrMentorId, rating, review, userId, reviewType })
            } else {
                response = await this.reviewService.createReview({ mentorId: courseIdOrMentorId, rating, review, userId, reviewType })
            }
            successResponse(res, HttpStatus.CREATED, "Course review created", { newReview: response })
        } catch (error) {
            console.error('Error founded in create course review', error);
            next(error)
        }
    }
}