import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces/IMessage";


const messageSchema: Schema<IMessage> = new Schema({
    // sender: { type: String, required: true, ref: 'User' },
    // recipient: { type: String, required: true, ref: 'User' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    lastUpdated: { type: Date, default: Date.now },
  });

export const Message = mongoose.model('Message',messageSchema)

