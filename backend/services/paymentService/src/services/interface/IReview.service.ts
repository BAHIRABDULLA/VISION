import { IReview } from "../../models/review.model";


export interface IReviewService {
    getReviewsBycourseIdOrMentorId(courseIdOrMentorId: string, reviewType: 'course' | 'mentorship'): Promise<IReview[]>
    createReview(data: { courseId?: string, mentorId?: string, rating: number, review: string, userId: string, reviewType: string }):
        Promise<IReview | null>
    getTopReviews(): Promise<IReview[]>
    getTotalReview(): Promise<number | null>
}