import IUser from "../../interfaces/IUser";
import { User } from "../../models/user.model";
import { IUserRepository } from "../interface/IUser.repository";
import BaseRepository from "./base.repository";

export class UserRepository  extends BaseRepository<IUser> implements IUserRepository {
    async findUsersWithRole(role: string) {
        try {
          const users = await User.find({ role: { $ne: role } ,isMentorship:true });
          return users;
        } catch (error) {
          throw error;
        }
      }
}