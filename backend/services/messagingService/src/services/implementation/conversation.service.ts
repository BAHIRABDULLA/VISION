import { ConversationRepository } from "../../repositories/implementation/conversation.repository";


export class ConversationService {
    constructor(private conversationRepository:ConversationRepository){}
    
    
    async getMessages(userId:string,participantId:string){
        try {
            // const conversation = await this.conversationRepository.findAll({
            //     $or:
            // })
            return null
        } catch (error) {
            console.error('Error founded in get  messages in service',error);
        }
    }
}