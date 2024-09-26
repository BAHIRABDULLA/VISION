import mongoose,{Schema} from "mongoose";

interface IUser {
    fullName:string;
    email:string;
    password:string;
    role:'mentee'| 'mentor';
    image:string;
    createAt:Date
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
    image:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

export const User = mongoose.model('User',userSchema)