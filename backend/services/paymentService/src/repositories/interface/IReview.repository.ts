import { IReview } from "../../models/review.model";
import { IBaseRepository } from "./IBase.repository";

export interface IReviewRepository extends IBaseRepository<IReview> {
    findAllCoursesReviews(courseId: string): Promise<IReview[]>
}