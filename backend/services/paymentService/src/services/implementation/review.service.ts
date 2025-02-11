import mongoose from "mongoose";
import { HttpStatus } from "../../enums/http.status";
import { IPaymentRepository } from "../../repositories/interface/IPayment.repository";
import { IReviewRepository } from "../../repositories/interface/IReview.repository";
import CustomError from "../../utils/custom.error";


export class ReviewService {
    constructor(private reviewRepository: IReviewRepository, private paymentRepository: IPaymentRepository) { }

    async getReviewsBycourseIdOrMentorId(courseIdOrMentorId: string, reviewType: 'course' | 'mentorship') {
        try {

            const response = await this.reviewRepository.findAllReviews(courseIdOrMentorId, reviewType)
            // return await this.reviewRepository.findAllCoursesReviews(courseIdOrMentorId)
            return response
        } catch (error) {
            console.error('Error founded in get reviews by course id', error);
            throw error
        }
    }

    async createReview(data: { courseId?: string, mentorId?: string, rating: number, review: string, userId: string, reviewType: 'course' | 'mentorship' }) {
        try {
            // const {courseId,mentorId,rating,review,userId,reviewType} = data
            const checkExistingReview = await this.reviewRepository.findExistingReview(data.userId, data.courseId, data.mentorId)
            if (checkExistingReview) {
                throw new CustomError('You already submited review, Thanks your effort', HttpStatus.FORBIDDEN)
            }
            if (data.reviewType === 'course') {
                const isEligibleWriteReview = await this.paymentRepository.findIsUserBoughtCourse(data.courseId!, data.userId)
                if (!isEligibleWriteReview) {
                    throw new CustomError('Please purchase the course', HttpStatus.UNAUTHORIZED)
                }
            } else {
                const isEligibleWriteReview = await this.paymentRepository.findOne({ menteeId: data.userId, type: { $ne: 'course_purchase' }, status: 'completed' })
                if (!isEligibleWriteReview) {
                    throw new CustomError('Please purchase any mentorship plans', HttpStatus.UNAUTHORIZED)
                }
            }
            const reviewData = {
                ...data,
                userId: new mongoose.Types.ObjectId(data.userId)
            }
            const response = await this.reviewRepository.create(reviewData)
            return response

        } catch (error) {
            console.error('Error founded in create course review', error);
            throw error
        }
    }

    async getTopReviews() {
        try {
            const response = await this.reviewRepository.findTopReviews()            
            return response
        } catch (error) {
            throw error
        }
    }

    async getTotalReview() {
        try {
            const response = await this.reviewRepository.findAll()
            return response.length
        } catch (error) {
            throw error
        }
    }
}