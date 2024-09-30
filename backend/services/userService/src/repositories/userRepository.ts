import { User } from "../models/userModel";

export const userRepository ={
    findByEmail:async(email:string)=>{
        return await User.findOne({email})
    },

    createUser:async(userData:{fullName:string,email:string,password:string,role:string,isVerified?:boolean})=>{
        const user = new User(userData)
        return user.save()
    },
    updateUserVerificationStatus:async(email:string,isVerified:boolean)=>{
        return await User.findOneAndUpdate({email},{$set:{isVerified:isVerified}})
    }

    // saveOTP:async(email:string,otp:string)=>{
    //     const user = await User.findOneAndUpdate({email},{otp})
    // }
}