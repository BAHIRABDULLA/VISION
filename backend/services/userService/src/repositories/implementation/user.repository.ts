import IUser from "../../interfaces/IUser";
import {  User } from "../../models/user.model";
import IUserRepository from "../interface/IUser.repository";
import BaseRepository from "./base.repository";


export class UserRepository extends BaseRepository<IUser> implements IUserRepository{


    async findByEmail(email: string):Promise<IUser | null> {
        try {
            return await User.findOne({ email })
        } catch (error) {
            console.error('Error founded in find via email', error);
            return null
        }
    }

    // async updateUserVerificationStatus(email: string, isVerified: boolean):Promise<IUser|null > {
    //     try {
    //         return await User.findOneAndUpdate({ email }, { $set: { isVerified } })
    //     } catch (error) {
    //         console.error('Error founded in update user verify status', error);
    //     }
    // }


    // async updatePasswordUser(email: string, password: string) {
    //     try {
    //         return await User.findOneAndUpdate({ email }, { $set: { password } })
    //     } catch (error) {
    //         console.error('Error founded in update user password', error);
    //     }
    // }

    async updateUserField(email: string, field: string, value: string ): Promise<IUser | null> {
        const update = {$set:{[field]:value}}
        return await User.findOneAndUpdate({email},update,{new:true})
    }

}