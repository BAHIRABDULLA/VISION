import { User } from "../models/userModel";

export const userRepository ={
    findByEmail:async(email:string)=>{
        return await User.findOne({email})
    },

    createUser:async(userData:{fullName:string,email:string,password:string,role:string})=>{
        const user = new User(userData)
        return user.save()
    },

    saveOTP:async(email:string,otp:string)=>{
        const user = await User.findOneAndUpdate({email},{otp})
    }
}