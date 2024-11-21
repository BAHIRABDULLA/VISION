import slotModel, { ISlot } from "../../model/slot.model";
import { BaseRepository } from "./base.repository";


export class SlotRepository extends BaseRepository<ISlot> {
    async findMentorSlots(id:string){
        try {
            const response = await slotModel.find({mentorId:id})
            return response
        } catch (error) {
            console.error('Error founded in findMentorSlots',error);
        }
    }
}