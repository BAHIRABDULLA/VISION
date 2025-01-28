import { Document } from "mongoose";

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
    invoiceCode?:string
    createdAt: Date;
}
