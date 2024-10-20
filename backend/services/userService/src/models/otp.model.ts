import mongoose,{Schema} from "mongoose";
import IOtp from "../interfaces/IOtp";


const otpSchema:Schema = new Schema({
    email:{type:String,required:true},
    otp:{type:String,required:true},
    createdAt:{type:Date,default:Date.now,expires:'60s'}
})

const Otp = mongoose.model<IOtp>('Otp',otpSchema)
export default Otp