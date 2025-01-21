import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces/IReview';


const reviewSchema = new Schema<IReview>({
    courseId:   {type:String},
    mentorId:   {type:String},
    userId: { type: String},
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Review = model<IReview>('Review', reviewSchema);

export { Review, IReview };