import { IMessageService } from "../../services/interface/IMessage.service";
import { Request,Response,NextFunction } from "express";

export class MessageController {
    constructor(private messageService:IMessageService){}

    async getChatHistory(req:Request,res:Response,next:NextFunction){
        try {
            const {userId,selectedUserId} = req.params
            const chatHistory = await this.messageService.getChatHistory(userId,selectedUserId)
            res.status(200).json(chatHistory)
        } catch (error) {
            console.error('Error founded in getChatHistory',error);
            res.status(500).json({error})
        }
    }
    
}