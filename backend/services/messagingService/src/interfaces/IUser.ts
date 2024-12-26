import  {Document, ObjectId} from "mongoose";

 interface IUser extends Document{
    _id:ObjectId;
    fullName: string;
    email: string;
    role: 'mentee' | 'mentor';
    isVerified: boolean;
    profile: string;
    createAt: Date
    isApproved: 'pending'|'approved'|'rejected';
    isActive: boolean   
}
export default IUser