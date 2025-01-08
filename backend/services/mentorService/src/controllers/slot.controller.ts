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

    async createSlot(req:customRequest,res:Response , next:NextFunction){
        try {
            console.log('-----   4      ---------');

            const user = req.user as JwtPayload
            const {time,availableDays} = req.body
            console.log(time,'data in create slot controller',availableDays);
          
            const response = await this.slotService.createSlot(time,availableDays,user.id)
            if(!response){
                return errorResponse(res,HttpStatus.NOT_FOUND,"Mentor slot not created")
            }
            return successResponse(res,HttpStatus.OK,"Mentor slot created",response)
        } catch (error) {
            console.error('Error founded in create slot',error);
            next(error)
        }
    }



    async getSlot(req:customRequest,res:Response,next:NextFunction){
        try {
            console.log('-----   3      ---------');

            console.log('hey bana neeee');
            
            const user = req.user as JwtPayload
            console.log(user,' user   ++++++++++++++');
            
            const response = await this.slotService.getSlotByUser(user.id)
            console.log(response,'response ,,  }}}}}}}}' );
            
            return successResponse(res,HttpStatus.OK,"Founded all slots",{data:response})
        } catch (error) {
            console.error('Error founded in get slots in slotController',error);
            next(error)
        }
    }


    async deleteSlot(req:customRequest,res:Response,next:NextFunction){
        try {
            console.log('-----   2      ---------');
            const user = req.user as JwtPayload
            const {id} = req.params
            console.log(id,'id in delete slot')
            const response = await this.slotService.removeSlot(user.id,id)
            if(!response){
                return errorResponse(res,HttpStatus.NOT_FOUND,"Slot not founded")
            }
            return successResponse(res,HttpStatus.OK,"Slot deleted")
        } catch (error) {
            console.error('Error founded in delete slot in slot controller',error);
            next(error)
        }
    }



    async bookingSlot(req:customRequest,res:Response ,next:NextFunction){
        try {

            console.log('-----   1      ---------');
            
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

    async getBookingSlotDetails(req:Request,res:Response,next:NextFunction){
        try {

            const {bookingId}  = req.params
            console.log(bookingId,'booking id in get booking slot details');
            
            const response  = await this.slotService.getBookingSlotDetails(bookingId)    
            return successResponse(res,HttpStatus.OK,"Founded booking slot details",{booking:response})
        } catch (error) {
            console.error('Error founded in get booking slot details',error);
            next(error)
        }
    }

    async getBookingSlot(req:customRequest,res:Response,next:NextFunction){
        try {
            console.log('-----   0      ---------');
            const user = req.user as JwtPayload 
            const response = await this.slotService.getBookingSlot(user.id,user.role)
            return successResponse(res,HttpStatus.OK,"Founded all booking slots",{bookings:response})
        } catch (error) {
            console.error('Error founded in get booking slot controller',error);
            next(error)
        }
    }
}