import mongoose,{Schema} from "mongoose";

interface IUser {
    fullName:string;
    email:string;
    password:string;
    role:'mentee'| 'mentor';
    isVerified:boolean;
    image:string;
    createAt:Date
    isApproved:boolean
}

const userSchema = new Schema<IUser>({
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
    role:{
        type:String,
        enum:['mentee' , 'mentor'],
        required:true
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false
    },
    image:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    isApproved:{
        type:Boolean
    }
})

export const User = mongoose.model('User',userSchema)