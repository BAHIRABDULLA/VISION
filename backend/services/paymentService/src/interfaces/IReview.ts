import { Document, Types } from "mongoose";

export interface IReview extends Document {
    courseId?: string;
    mentorId?: string;
    userId: Types.ObjectId;
    rating: number;
    review: string;
    type:'course' | 'mentorship'
    createdAt: Date;
    updatedAt: Date;
}
