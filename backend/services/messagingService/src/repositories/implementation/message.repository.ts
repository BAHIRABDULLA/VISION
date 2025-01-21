import { IMessage } from "../../interfaces/IMessage";
import { Message } from "../../models/message.model";
import { IMessageRepository } from "../interface/IMessage.repository";
import BaseRepository from "./base.repository";

export class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository{
    async findOneAndUpdateMessage(sender:string,recipient:string,message:string[]){
        try {
            const response = await Message.findOneAndUpdate(
                {sender,recipient},
                {
                    $push:{messages:{text:message}}
                },
                {upsert:true,new:true}
            )
            return response
        } catch (error) {
            throw error
        }
    }
}