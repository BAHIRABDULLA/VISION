import slotModel, { ISlot } from "../../model/slot.model";
import { ISlotRepository } from "../interface/ISlot.repository";
import { BaseRepository } from "./base.repository";


export class SlotRepository extends BaseRepository<ISlot>  implements ISlotRepository{
    async findMentorSlots(id:string){
        try {
            const response = await slotModel.find({mentorId:id})
            return response
        } catch (error) {
            console.error('Error founded in findMentorSlots',error);
        }
    }
}