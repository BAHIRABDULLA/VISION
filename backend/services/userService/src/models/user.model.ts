import mongoose, { Schema ,Document, ObjectId} from "mongoose";

export interface IUser extends Document{
    _id:ObjectId;
    fullName: string;
    email: string;
    password: string;
    role: 'mentee' | 'mentor';
    isVerified: boolean;
    image: string;
    createAt: Date
    isApproved: 'pending'|'approved'|'rejected';
    isActive: boolean
}

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['mentee', 'mentor'], required: true },
    isVerified: { type: Boolean, required: true, default: false },
    image: { type: String },
    createAt: { type: Date, default: Date.now() },
    isApproved: { type: String,enum:['pending','approved','rejected'] , default:'pending' },
    isActive: { type: Boolean, required: true, default: true }
})

export const User = mongoose.model('User', userSchema)