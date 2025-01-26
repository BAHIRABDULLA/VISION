import { IReview } from "../../models/review.model";
import { IBaseRepository } from "./IBase.repository";

export interface IReviewRepository extends IBaseRepository<IReview> {
    findAllReviews(courseIdOrMentorId: string,reviewType:'course'|'mentorship'): Promise<IReview[]>
    findExistingReview(userId:string,courseId?:string,mentorId?:string):Promise<IReview | null>

}