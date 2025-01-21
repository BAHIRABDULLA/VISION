import { IMessage } from "../../interfaces/IMessage";
import { IBaseRepository } from "./IBase.repository";


export interface IMessageRepository extends IBaseRepository<IMessage>{
    findOneAndUpdateMessage(sender:string,recipient:string,message:string[]):Promise<IMessage | null>
    
}