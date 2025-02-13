import  {Document} from "mongoose";

 interface IUser extends Document{
    
    fullName: string;
    email: string;
    role: 'mentee' | 'mentor';
    isVerified: boolean;
    profile: string;
    createAt: Date
    isApproved: 'pending'|'approved'|'rejected';
    isActive: boolean
    isMentorFormFilled:boolean
}

export default IUser