import { IMentor } from "../../interfaces/IMentor";
import IUser from "../../interfaces/IUser";


export interface IUserService {
    getAllUsers():Promise<IUser[] | undefined> ;
    getUser(id:string):Promise<IUser | IMentor | undefined>;
    uploadMentorData(data:IMentor):Promise<void>
    updateUser(id:string,userData:{fullName:string,profile:string}):Promise<IUser |null>
    updateUserApproval(id:string,isApproved:string):Promise<any>
    updateUserStatus(id:string,isActive:boolean):Promise<any>
}