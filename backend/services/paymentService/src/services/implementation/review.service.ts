import { IReviewRepository } from "../../repositories/interface/IReview.repository";


export class ReviewService {
    constructor(private reviewRepository: IReviewRepository) {}

    async getReviewsByCourseId(courseId: string) { 
        try {
            return await this.reviewRepository.findAllCoursesReviews(courseId)
        } catch (error) {
            console.error('Error founded in get reviews by course id', error);
            throw error
        }
    }

    async createCourseReview(data: { courseId: string, rating: number, review: string, userId: string }) {
        try {
            return await this.reviewRepository.create(data)
        } catch (error) {
            console.error('Error founded in create course review', error);
            throw error
        }
    }
}