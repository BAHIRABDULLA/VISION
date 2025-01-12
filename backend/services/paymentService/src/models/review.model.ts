import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
    courseId?: string;
    mentorId?: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
    courseId:   {type:String},
    mentorId:   {type:String},
    userId: { type: String},
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Review = model<IReview>('Review', reviewSchema);

export { Review, IReview };