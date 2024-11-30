import { NextFunction, Request,Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { SlotService } from "../services/implementation/slot.service";
import { errorResponse, successResponse } from "../utils/response.handler";
import { HttpStatus } from "../enums/http.status";




interface customRequest extends Request {
    user?: string | JwtPayload
}




export class SlotController {

    private slotService:SlotService
    constructor(slotService:SlotService){
        this.slotService = slotService
    }

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
            const response = await this.slotService.createSlot(data)
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
            const response = await this.slotService.getSlots()
            console.log(response,'response ,,  }}}}}}}}' );
            
            return successResponse(res,HttpStatus.OK,"Founded all slots",{data:response})
        } catch (error) {
            console.error('Error founded in get slots in slotController',error);
        }
    }


    async deleteSlot(req:Request,res:Response){
        try {
            const {id} = req.params
            console.log(id,'id in delete slot')
            const response = await this.slotService.deleteSlot(id)
            if(!response){
                return errorResponse(res,HttpStatus.NOT_FOUND,"Slot not founded")
            }
            return successResponse(res,HttpStatus.OK,"Slot deleted")
        } catch (error) {
            console.error('Error founded in delete slot in slot controller',error);
        }
    }



    async bookingSlot(req:customRequest,res:Response ,next:NextFunction){
        try {
            const {mentorId,time,date} = req.body
            const user = req.user as JwtPayload
            console.log(user,'user as booking slot');
            
            console.log(req.body,'req.body oin booking slot controller');
            
            const response = await this.slotService.bookSlot(mentorId,user.id,time,date)
            
            return successResponse(res,HttpStatus.OK,"created")
        } catch (error) {
            console.error('Error founded in booking slot controller',error);
            next(error)
        }
    }
}