import { IMentor } from "../../interface/IMentor";
import { IBaseRepository } from "./IBase.repository";


export interface IMentorRepository  extends IBaseRepository<IMentor>{
    findByEmail(email: string):Promise<any>
    findMentor(id: string):Promise<any>
    findMentorAndUpdate(id:string,data:object):Promise<any>
    findAllWithUserData():Promise<any>
    findByIdWithBasicInfo(id:string):Promise<any>
}