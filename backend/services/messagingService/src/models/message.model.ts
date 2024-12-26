import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Conversation",required:true
    },
    sender: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
    // receiverId: { type: String, required: true },
    content: { type: String, required: true },
    readBy: { type: Boolean, default: false },
    sentAt:{type:Date,default:Date.now}
})


export const Message = mongoose.model('Message',messageSchema)