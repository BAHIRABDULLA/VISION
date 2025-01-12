import { IMentor } from "../../interface/IMentor";
import { IUser } from "../../interface/IUser";
import { IBaseRepository } from "./IBase.repository";
export interface IPopulatedMentor extends IMentor {
    mentor: IUser;
}

export interface IMentorRepository  extends IBaseRepository<IMentor>{
    findByEmail(email: string):Promise<IMentor | null>
    findMentor(id: string):Promise< IMentor | null>
    findMentorAndUpdate(id:string,data:object):Promise<IMentor | null>
    findAllWithUserData():Promise<IPopulatedMentor[] | null>
    findByIdWithBasicInfo(id:string):Promise< IMentor | null>
}