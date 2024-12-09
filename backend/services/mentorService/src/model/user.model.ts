import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/IUser";


const userSchema = new Schema<IUser>({
    _id: { type: Schema.Types.ObjectId, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
    },
    password: { type: String, required: true },
    isApproved: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isMentorFormFilled:{type:Boolean}
})

export const User = mongoose.model<IUser>('User', userSchema)