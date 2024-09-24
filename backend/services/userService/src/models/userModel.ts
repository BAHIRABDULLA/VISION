import mongoose,{Schema} from "mongoose";

interface IUser {
    fullName:string;
    email:string;
    password:string;
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
    image:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

export const User = mongoose.model('User',userSchema)