import { IUser } from "../../interface/IUser";
import { User } from "../../model/user.model";
import { IUserRepository } from "../interface/IUser.repository";
import { BaseRepository } from "./base.repository";


export class UserRepository extends BaseRepository<IUser> implements IUserRepository {


    async isMentor(email: string) {
        try {
            const user = await User.findOne({ email })
            return user
        } catch (error) {
            throw error
        }
    }

    async findAllApprovedMentors() {
        try {
            const response = await User.find({ isApproved: 'approved' })
            return response
        } catch (error) {
            return []
        }
    }

    async findByIdAndUpdate(data: IUser): Promise<IUser | null> {
        try {
            if (!data._id) {
                return null
            }
            return await User.findByIdAndUpdate(data._id, { $set: data },
                { upsert: true, new: true }
            )
        } catch (error) {
            throw error
        }
    }

}