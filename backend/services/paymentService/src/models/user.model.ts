import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";


const userSchema = new Schema<IUser>({
    _id: { type: Schema.Types.ObjectId, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['mentee', 'mentor'], required: true },
    isVerified: { type: Boolean, required: true, default: false },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
    },
    isActive: { type: Boolean, required: true, default: true },
    isApproved: {
        type: String, enum: ['pending', 'approved', 'rejected'],
        required: function () { return this.role === 'mentor'; }
    },
    isMentorship:{type:Boolean,default:false},
   
    createAt: { type: Date, default: Date.now() },
})

export const User = mongoose.model('User', userSchema)