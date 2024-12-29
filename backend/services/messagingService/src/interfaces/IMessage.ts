import { Document } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  recipient: string;
  message: string;
  timestamp: Date;
}