import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false }
})


export const Message = mongoose.model('Message',messageSchema)