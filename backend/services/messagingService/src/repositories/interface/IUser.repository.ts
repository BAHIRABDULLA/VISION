import IUser from "../../interfaces/IUser";
import { IBaseRepository } from "./IBase.repository";

export interface IUserRepository extends IBaseRepository<IUser>{
    findUsersWithRole(role:string):Promise<Partial<IUser>[] | null>
    findByIdAndUpdate(data:object):Promise<IUser | null>
}
