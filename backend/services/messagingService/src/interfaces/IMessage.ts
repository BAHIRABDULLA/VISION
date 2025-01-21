import { Document } from "mongoose";

interface IChat {
  text:string,
  timestamp:Date
}
export interface IMessage extends Document {
  sender: string;
  recipient: string;
  messages: IChat
  timestamp: Date;
}