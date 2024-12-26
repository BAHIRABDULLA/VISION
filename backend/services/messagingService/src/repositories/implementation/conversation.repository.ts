import { IConversation } from "../../interfaces/IConversation";
import { IConversationRepository } from "../interface/IConversation.repository";
import BaseRepository from "./base.repository";

export class ConversationRepository extends BaseRepository<IConversation> implements IConversationRepository{
    
}