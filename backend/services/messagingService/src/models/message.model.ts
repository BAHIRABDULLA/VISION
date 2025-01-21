import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces/IMessage";


const messageSchema: Schema<IMessage> = new Schema({
    sender: { type: String, required: true, ref: 'User' },
    recipient: { type: String, required: true, ref: 'User' },
    messages: [
      {
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    timestamp: { type: Date, default: Date.now },
  });

export const Message = mongoose.model('Message',messageSchema)

