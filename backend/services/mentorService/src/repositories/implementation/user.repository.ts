import { IUser, User } from "../../model/user.model";
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
}