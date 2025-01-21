import { Document } from "mongoose";

export interface IReview extends Document {
    courseId?: string;
    mentorId?: string;
    userId: string;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}
