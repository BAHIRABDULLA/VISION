import { User } from "../models/userModel";

export const userRepository ={
    findByEmail:async(email:string)=>{
        return await User.findOne({email})
    },

    createUser:async(userData:{fullName:string,email:string,password:string,role:string})=>{
        const user = new User(userData)
        return user.save()
    },
    updateUserVerificationStatus:async(email:string,isVerfied:boolean)=>{
        return await User.findOneAndUpdate({email},{$set:{isVerfied:isVerfied}})
    }

    // saveOTP:async(email:string,otp:string)=>{
    //     const user = await User.findOneAndUpdate({email},{otp})
    // }
}