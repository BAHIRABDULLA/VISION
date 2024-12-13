import slotModel, { ISlot } from "../../model/slot.model";
import { ISlotRepository } from "../interface/ISlot.repository";
import { BaseRepository } from "./base.repository";


export class SlotRepository extends BaseRepository<ISlot>  implements ISlotRepository{
    async findMentorSlots(id:string){
        try {
            const response = await slotModel.findOne({mentorId:id})
            return response
        } catch (error) {
            console.error('Error founded in findMentorSlots',error);
            throw error
        }
    }


    async createOrUpdateSlots (time:string,availableDays:string[],mentorId:string){
        try {
            const response = await slotModel.updateOne(
                {mentorId},
                {
                    $push:{slots:{time,availableDays}}
                },
                {upsert:true}
            )
            if(response.modifiedCount>0 || response.upsertedCount >0){
                return await slotModel.findOne({mentorId})
            }
            return null
        } catch (error) {
            console.error('ERror founded in create or update slots',error);
            throw error
        }
    }


    async removeSlotById(mentorId:string,slotId:string){
        try {
            const response  = await slotModel.updateOne(
                {mentorId},
                {
                    $pull:{
                        slots:{
                            _id:slotId
                        }
                    }
                }
            )
            if(response.modifiedCount>0){
                const updateSlots = await slotModel.findOne({mentorId})
                return updateSlots
            }
            return null
        } catch (error) {
            console.error('Error founded in deleted slot',error);
            throw error
        }
    }
}