import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/IUser";
import { USER_IMAGE } from "../constants";


const userSchema = new Schema<IUser>({
    _id: { type: Schema.Types.ObjectId, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    profile: {
        type: String,
        default: USER_IMAGE
    },
    password: { type: String, required: true },
    isApproved: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isMentorFormFilled:{type:Boolean},
    sessionCount:{type:Number,default:0},
})

export const User = mongoose.model<IUser>('User', userSchema)