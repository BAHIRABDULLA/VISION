import { ISlot } from "../../model/slot.model";
import { IBaseRepository } from "./IBase.repository";


export interface ISlotRepository extends IBaseRepository<ISlot>{
    findMentorSlots(id:string):Promise<ISlot | null>
    createOrUpdateSlots (time:string,availableDays:string[],mentorId:string):Promise<ISlot | null>
    removeSlotById(mentorId:string,slotId:string):Promise<ISlot | null>
}