import mongoose,{Document,Schema} from "mongoose";

interface IOtp extends Document{
    email:string;
    otp:string;
    createdAt:Date,
    expiredAt:Date;
}

const otpSchema:Schema = new Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
    createdAt:{type:Date,default:Date.now(),expires:'30s'},
    expiredAt:{type:Date}
})

const otpModel = mongoose.model<IOtp>('Otp',otpSchema)
export default otpModel