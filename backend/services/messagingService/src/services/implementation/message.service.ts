import { IMessageRepository } from "../../repositories/interface/IMessage.repository";
import { IMessageService } from "../interface/IMessage.service";


export class MessageService implements IMessageService{
    constructor(private messageRepository:IMessageRepository){}


    async saveMessage(sender:string,recipient:string,message:string[]){
        try {
            // return await this.messageRepository.create({sender,recipient,message})
            const updateMessage = await this.messageRepository.findOneAndUpdateMessage(sender,recipient,message)
            return null
        } catch (error) {
            console.error('Error founded in save messages',error);
            throw error
        }
    }
}