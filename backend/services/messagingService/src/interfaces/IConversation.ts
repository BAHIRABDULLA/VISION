import { Types, Document } from "mongoose";


export interface IParticipant {
  userId: Types.ObjectId;
  role: 'mentor' | 'mentee';
}

export interface IConversation extends Document {
  participants: IParticipant[]
  lastMessage?: string;
  lastMessageAt?: Date
  updatedAt: Date;
  createdAt: Date;
}