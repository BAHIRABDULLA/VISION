import mongoose, { Schema, Document } from 'mongoose';
import { IPayment } from '../interfaces/IPayment';


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