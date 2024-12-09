import {Document, Types}  from "mongoose";

export interface IUser extends Document{
    _id:Types.ObjectId
    fullName:string;
    email:string;
    profile:string
    password:string;
    isApproved: 'pending' | 'approved' | 'rejected',
    isMentorFormFilled:boolean
}