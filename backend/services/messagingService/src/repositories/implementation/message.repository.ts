import { IMessage } from "../../interfaces/IMessage";
import { IMessageRepository } from "../interface/IMessage.repository";
import BaseRepository from "./base.repository";

export class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository{
    
}