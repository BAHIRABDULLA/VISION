import {  IReview, Review } from "../../models/review.model";
import { IReviewRepository } from "../interface/IReview.repository";
import BaseRepository from "./base.repository";

 export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepository{
    async findAllCoursesReviews(courseId: string): Promise<IReview[]> {
        return await Review.find({courseId})
    }
  
}