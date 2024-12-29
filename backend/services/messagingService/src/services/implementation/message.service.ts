import { IMessageRepository } from "../../repositories/interface/IMessage.repository";
import { IMessageService } from "../interface/IMessage.service";


export class MessageService implements IMessageService{
    constructor(private messageRepository:IMessageRepository){}


    async saveMessage(sender:string,recipient:string,message:string){
        try {
            return await this.messageRepository.create({sender,recipient,message})
        } catch (error) {
            console.error('Error founded in save messages',error);
        }
    }
}