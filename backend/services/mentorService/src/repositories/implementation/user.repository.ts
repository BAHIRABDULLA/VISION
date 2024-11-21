import { IUser } from "../../interface/IUser";
import { User } from "../../model/user.model";
import { BaseRepository } from "./base.repository";


export class UserRepository extends BaseRepository<IUser> {

    
    async isMentor(email: string) {
        try {
            const user = await User.findOne({email})
            return user
        } catch (error) {
            console.error('Error founded in finding emial',error);
        }
    }

    async findAllApprovedMentors(){
        try {
            const response  = await User.find({isApproved:'approved'})
            return response
        } catch (error) {
            console.error('Error founded in find all approved mentors',error);
        }
    }

    
}