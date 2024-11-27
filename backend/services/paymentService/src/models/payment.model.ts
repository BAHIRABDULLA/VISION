import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
    userEmail: string;
    amount: number;
    status: 'pending' | 'completed';
    type: 'course_purchase' | 'mentorship_subscription' | 'one_time_payment';
    courseId?: string;
    menteeId:string;
    mentorId?: string;
    subscriptionPeriod?: string;
    stripeSessionId?: string;
    stripePaymentIntentId?: string
    createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pending', 'completed'] },
    type: { type: String, required: true, enum: ['course_purchase', 'mentorship_subscription', 'one_time_payment'] },
    courseId: { type: String },
    menteeId: { type: String, required: true },
    mentorId: { type: String },
    subscriptionPeriod: { type: String },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;