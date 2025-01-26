import { IReview, Review } from "../../models/review.model";
import { IReviewRepository } from "../interface/IReview.repository";
import BaseRepository from "./base.repository";

export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepository {
    async findAllReviews(courseIdOrMentorId: string, reviewType: 'course' | 'mentorship'): Promise<IReview[]> {
        try {
            return await Review.find(reviewType === 'course' ? { courseId: courseIdOrMentorId } : { mentorId: courseIdOrMentorId })
            .populate('userId')
        } catch (error) {
            throw error
        }
    }


    async findExistingReview(userId: string, courseId?: string, mentorId?: string): Promise<IReview | null> {
        try {
            const response = await Review.findOne({ userId, courseId, mentorId })
            return response
        } catch (error) {
            throw error
        }
    }

}