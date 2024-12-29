
import mongoose, { Schema } from "mongoose";
import { IConversation } from "../interfaces/IConversation";

const conversationSchema = new Schema<IConversation>({
    participants: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: ['mentee', 'mentor'] }
    }

    ],
    lastMessage: { type: String, default: null },
    lastMessageAt: { type: Date, default: Date.now }
},
    { timestamps: true }
)

const Conversation = mongoose.model('Conversation', conversationSchema)
export default Conversation
