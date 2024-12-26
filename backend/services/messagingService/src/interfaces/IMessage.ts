import { Document } from "mongoose";

export interface IMessage extends Document{
    _id: string;
    conversationId: string;
    sender: string; 
    text: string; 
    seenBy: { userId: string }[];
    sentAt: Date; 
    createdAt: Date; 
    updatedAt: Date;
  }