import { IReview } from "../../models/review.model";


export interface IReviewService {
    getReviewsByCourseId(courseId: string): Promise<IReview[]>
    createCourseReview(data: { courseId: string, rating: number, review: string, userId: string }): Promise<IReview | null>
}