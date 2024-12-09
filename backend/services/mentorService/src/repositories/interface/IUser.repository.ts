import { IUser } from "../../interface/IUser";
import { IBaseRepository } from "./IBase.repository";


export interface IUserRepository extends IBaseRepository<IUser>{
    isMentor(email:string):Promise<any>
    findAllApprovedMentors():Promise<any>
}