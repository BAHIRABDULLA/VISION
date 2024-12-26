import { Document } from "mongoose";

export interface IConversation extends Document{
    _id: string; 
    participants: string
    lastMessage?: string; 
    updatedAt: Date;
    createdAt: Date; 
  }