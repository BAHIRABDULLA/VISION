import mongoose, { Schema, Document } from 'mongoose';
 
export interface IPayment extends Document {
    userEmail: string;
    amount: number;
    status:  'pending' | 'completed' ;
    type: 'course_purchase' | 'mentorship_subscription' | 'one_time_payment';
    courseId?: string; 
    mentorId?: string; 
    subscriptionPeriod?: string;
    createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true ,enum:['pending','completed'] },
    type: { type: String, required: true, enum: ['course_purchase', 'mentorship_subscription', 'one_time_payment'] },
    courseId: { type: String, required: false },
    mentorId: { type: String, required: false },
    subscriptionPeriod: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;