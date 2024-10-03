import mongoose,{Schema,Document, Types}  from "mongoose";

interface IUser{
    _id:Types.ObjectId
    fullName:string;
    email:string;
    password:string
}

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
    }
}) 

export const User = mongoose.model<IUser>('User',userSchema)