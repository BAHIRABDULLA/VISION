import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
    userEmail: string;
    amount: number;
    status: 'pending' | 'completed';
    type: 'course_purchase' | 'mentorship_subscription' | 'one_time_payment';
    courseId?: string;
    menteeId:string;
    mentorId?: string;
    sessionCount: number;

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
    sessionCount: { type: Number , default:0 },
    createdAt: { type: Date, default: Date.now }
});
paymentSchema.pre('save',function(next){
    if(this.type ==='mentorship_subscription' && this.sessionCount ===0){
        this.sessionCount  = 4
    }else if(this.type ==='one_time_payment' && this.sessionCount === 0){
        this.sessionCount  =  1
    }
    next()
})

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;