
import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    participants:[{
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    }
       
    ],
    lastMessage:{type:String,default:null},
    lastMessageAt:{type:Date,default:Date.now}
})

const Conversation = mongoose.model('Conversation',conversationSchema)
export default Conversation
