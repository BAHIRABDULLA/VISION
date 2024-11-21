import Slot from "../model/slot.model";
import { SlotRepository } from "../repositories/implementation/slot.repository";


const slotRepository = new SlotRepository(Slot)

export class SlotService {
    async createSlot(data: object) {
        try {
            const response = await slotRepository.create(data)
            console.log(response, 'response in create slot');
            return response
        } catch (error) {
            console.error('Error founded in slot service', error);
        }
    }


    async getSlots() {
        try {
            const getAllSlots = await slotRepository.findAll()
            return getAllSlots
        } catch (error) {
            console.error('Error founded in get slots', error);
        }
    }

    async deleteSlot(id: string) {
        try {
            const resposne = await slotRepository.delete(id)
            return resposne
        } catch (error) {
            console.error('Error founded in delete slot in slot service', error);
        }
    }
}