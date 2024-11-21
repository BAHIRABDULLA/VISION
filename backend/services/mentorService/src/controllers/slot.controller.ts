import { Request,Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { SlotService } from "../services/slot.service";
import { errorResponse, successResponse } from "../utils/response.handler";
import { HttpStatus } from "../enums/http.status";




interface customRequest extends Request {
    user?: string | JwtPayload
}


const slotService = new SlotService()

export class SlotController {


    async createSlot(req:customRequest,res:Response){
        try {
            const user = req.user as JwtPayload
            const {time,availableDays} = req.body
            console.log(time,'data in create slot controller',availableDays);
            const data = {
                time,
                availableDays,
                mentorId:user.id
            }
            const response = await slotService.createSlot(data)
            if(!response){
                return errorResponse(res,HttpStatus.NOT_FOUND,"Mentor slot not created")
            }
            return successResponse(res,HttpStatus.OK,"Mentor slot created",response)
        } catch (error) {
            console.error('Error founded in create slot',error);
        }
    }



    async getSlots(req:Request,res:Response){
        try {
            const response = await slotService.getSlots()
            return successResponse(res,HttpStatus.OK,"Founded all slots",{data:response})
        } catch (error) {
            console.error('Error founded in get slots in slotController',error);
        }
    }


    async deleteSlot(req:Request,res:Response){
        try {
            const {id} = req.params
            console.log(id,'id in delete slot')
            const response = await slotService.deleteSlot(id)
            if(!response){
                return errorResponse(res,HttpStatus.NOT_FOUND,"Slot not founded")
            }
            return successResponse(res,HttpStatus.OK,"Slot deleted")
        } catch (error) {
            console.error('Error founded in delete slot in slot controller',error);
        }
    }
}