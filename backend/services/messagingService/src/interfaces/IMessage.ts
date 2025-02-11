import { Document, Types } from "mongoose";

interface IChat {
  sender:Types.ObjectId,
  text:string,
  timestamp:Date
}
export interface IMessage extends Document {
  // sender: string;
  // recipient: string;
  participants: Types.ObjectId[];
  messages: IChat[]
  lastUpdated: Date;
}