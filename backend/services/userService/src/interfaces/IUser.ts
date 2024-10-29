import  {Document, ObjectId} from "mongoose";

 interface IUser extends Document{
    _id:ObjectId;
    fullName: string;
    email: string;
    password: string;
    role: 'mentee' | 'mentor';
    isVerified: boolean;
    profile: string;
    createAt: Date
    isApproved: 'pending'|'approved'|'rejected';
    isActive: boolean
    isMentorFormFilled:boolean
}

export default IUser