import mongoose,{Schema}  from "mongoose";
import { IUser } from "../interface/IUser";


const userSchema=new Schema<IUser>({
    _id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isApproved: {type: String,enum: ['pending', 'approved', 'rejected'],default: 'pending' }
}) 

export const User = mongoose.model<IUser>('User',userSchema)