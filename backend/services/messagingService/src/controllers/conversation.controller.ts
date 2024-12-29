import {Request,Response, NextFunction } from "express";
import { ConversationService } from "../services/implementation/conversation.service";
import { HttpStatus } from "../enums/http.status";


export class ConversationController {
    constructor(private conversationService:ConversationService){}

    async getMessages(req:Request,res:Response,next:NextFunction){
        try {
            const {userId,participantId} = req.params
            const  response =  await this.conversationService.getMessages(userId,participantId)
            return res.status(HttpStatus.NOTFOUND).json(response)
        } catch (error) {
            console.error('Error founded in get messages',error);
        }
    }
}