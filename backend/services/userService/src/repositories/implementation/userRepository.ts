import { User } from "../../models/userModel";

export const userRepository = {
    findByEmail: async (email: string) => {
        return await User.findOne({ email })
    },

    createUser: async (userData: { fullName: string, email: string, password: string, role: string,isApproved?:boolean, isVerified?: boolean }) => {
        if (userData.role === 'mentor') {
            userData.isApproved = false;
        }
        const user = new User(userData);
        return user.save();
    },
    updateUserVerificationStatus: async (email: string, isVerified: boolean) => {

        return await User.findOneAndUpdate({ email }, { $set: { isVerified: isVerified } })
    },
    updatePasswordUser: async (email: string, password: string) => {
        return await User.findOneAndUpdate({ email }, { $set: { password: password } })
    },
    getAllUsers:async()=>{
        return await User.find()
    }

    // saveOTP:async(email:string,otp:string)=>{
    //     const user = await User.findOneAndUpdate({email},{otp})
    // }
}