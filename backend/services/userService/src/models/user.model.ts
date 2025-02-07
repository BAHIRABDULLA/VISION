import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";
import { USER_IMAGE } from "../constants/user.role";


const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['mentee', 'mentor'], required: true },
    isVerified: { type: Boolean, required: true, default: false },
    profile: {
        type: String,
        default: USER_IMAGE
    },
    isActive: { type: Boolean, required: true, default: true },
    isApproved: {
        type: String, enum: ['pending', 'approved', 'rejected'],
        required: function () { return this.role === 'mentor'; }
    },
    isMentorFormFilled: {
        type: Boolean,
        required: function () { return this.role === 'mentor'; },
    },
    createAt: { type: Date, default: Date.now() },
})

export const User = mongoose.model('User', userSchema)