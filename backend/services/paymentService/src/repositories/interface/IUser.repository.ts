import IUser from "../../interfaces/IUser";
import { IBaseRepository } from "./IBase.repository";

export interface IUserRepository extends IBaseRepository<IUser>{
    findByIdAndUpdate(data:object):Promise<IUser | null>
}
