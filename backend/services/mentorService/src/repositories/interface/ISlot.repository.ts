import { ISlot } from "../../model/slot.model";
import { IBaseRepository } from "./IBase.repository";


export interface ISlotRepository extends IBaseRepository<ISlot>{
    findMentorSlots(id:string):Promise<any>
}