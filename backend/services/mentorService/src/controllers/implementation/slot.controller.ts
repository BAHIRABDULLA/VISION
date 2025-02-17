import { NextFunction, Request,Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { SlotService } from "../../services/implementation/slot.service";
import { errorResponse, successResponse } from "../../utils/response.handler";
import { HttpStatus } from "../../enums/http.status";
import { ISlotController } from "../interface/ISlot.controller";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants";




interface customRequest extends Request {
    user?: string | JwtPayload
}




export class SlotController implements ISlotController{

    private slotService:SlotService
    constructor(slotService:SlotService){
        this.slotService = slotService
    }

    async createSlot(req:customRequest,res:Response , next:NextFunction){
        try {

            const user = req.user as JwtPayload
            const {time,availableDays} = req.body
          
            const response = await this.slotService.createSlot(time,availableDays,user.id)
            if(!response){
                return errorResponse(res,HttpStatus.NOT_FOUND,ERROR_MESSAGES.MENTOR_SLOT_CREATION_FAILED)
            }
            return successResponse(res,HttpStatus.CREATED,SUCCESS_MESSAGES.MENTOR_SLOT_CREATED,response)
        } catch (error) {
            next(error)
        }
    }



    async getSlot(req:customRequest,res:Response,next:NextFunction){
        try {

            
            const user = req.user as JwtPayload
            
            const response = await this.slotService.getSlotByUser(user.id)
            
            return successResponse(res,HttpStatus.OK,SUCCESS_MESSAGES.ALL_SLOTS_FETCHED,{data:response})
        } catch (error) {
            next(error)
        }
    }


    async deleteSlot(req:customRequest,res:Response,next:NextFunction){
        try {
            const user = req.user as JwtPayload
            const {id} = req.params
            const response = await this.slotService.removeSlot(user.id,id)
            if(!response){
                return errorResponse(res,HttpStatus.NOT_FOUND,ERROR_MESSAGES.MENTOR_SLOT_NOT_FOUND)
            }
            return successResponse(res,HttpStatus.OK,SUCCESS_MESSAGES.SLOT_DELETED)
        } catch (error) {
            next(error)
        }
    }



    async bookingSlot(req:customRequest,res:Response ,next:NextFunction){
        try {

            
            const {mentorId,time,date} = req.body
            const user = req.user as JwtPayload
            const token = req.headers['authorization']?.split(' ')[1]!
            const response = await this.slotService.bookSlot(mentorId,user.id,time,date,token)
            return successResponse(res,HttpStatus.CREATED,SUCCESS_MESSAGES.SLOT_BOOKING_SUCCESS)
        } catch (error) {
            next(error)
        }
    }

    async getBookingSlotDetails(req:Request,res:Response,next:NextFunction){
        try {

            const {bookingId}  = req.params
            
            const response  = await this.slotService.getBookingSlotDetails(bookingId)    
            return successResponse(res,HttpStatus.OK,SUCCESS_MESSAGES.BOOKING_SLOT_DETAILS_FETCHED,{booking:response})
        } catch (error) {
            next(error)
        }
    }

    async getBookingSlot(req:customRequest,res:Response,next:NextFunction){
        try {
            const user = req.user as JwtPayload 
            const response = await this.slotService.getBookingSlot(user.id,user.role)
            return successResponse(res,HttpStatus.OK,SUCCESS_MESSAGES.BOOKING_SLOTS_FETCHED,{bookings:response})
        } catch (error) {
            next(error)
        }
    }

    async handleBookingSessionStatus(req:Request,res:Response,next:NextFunction){
        try {
            const {bookingId} = req.params
            const {status} = req.body
          const response = await this.slotService.handleBookingSessionStatus(bookingId,status)
          return successResponse(res,HttpStatus.OK,'Updated status',response)  
        } catch (error) {
            next(error)
        }
    }
}