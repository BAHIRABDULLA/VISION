import IUser from "../../interfaces/IUser";
import { IBaseRepository } from "./IBase.repository";


interface IUserRepository extends IBaseRepository<IUser> {
    findByEmail(email:string):Promise<IUser | null>
    // updateUserVerificationStatus(email:string,isVerified:boolean):Promise<IUser | null >
    updateUserField(email:string,field:string,value:any):Promise<IUser | null >

}

export default IUserRepository