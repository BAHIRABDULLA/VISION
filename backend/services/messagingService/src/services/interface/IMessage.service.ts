import { IMessage } from "../../interfaces/IMessage";


export interface IMessageService {
    saveMessage(sender:string,recipient:string,message:string):Promise<IMessage | null>
    getChatHistory(userId:string,selectedUserId:string):Promise<IMessage | null>
}