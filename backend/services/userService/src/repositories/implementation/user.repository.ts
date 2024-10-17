import { IUser, User } from "../../models/user.model";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<IUser> {
    async findByEmail(email: string) {
        return await User.findOne({ email })
    }

    // async createUser(userData: { fullName: string, email: string, password: string, role: string, isApproved?: boolean, isVerified?: boolean }) {
    //     // if (userData.role === 'mentor') {
    //     //     userData.isApproved = false;
    //     // }
    //     const user = new User(userData);
    //     return user.save();
    // }
    async updateUserVerificationStatus(email: string, isVerified: boolean) {

        return await User.findOneAndUpdate({ email }, { $set: { isVerified} })
    }
    async updatePasswordUser(email: string, password: string) {
        return await User.findOneAndUpdate({ email }, { $set: { password} })
    }
    // async getAllUsers() {
    //     return await User.find()
    // }

    // saveOTP:async(email:string,otp:string){
    //     const user = await User.findOneAndUpdate({email},{otp})
    // }
}