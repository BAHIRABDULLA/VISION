

export interface ISlotService {
    createSlot(data:object):Promise<any>
    getSlots():Promise<any>
    deleteSlot(id:string):Promise<any>
    bookSlot(mentorId:string,menteeId:string,time:string,date:Date):Promise<any>
}