import mongoose from "mongoose";
import { IMessage } from "../../interfaces/IMessage";
import { Message } from "../../models/message.model";
import { IMessageRepository } from "../interface/IMessage.repository";
import BaseRepository from "./base.repository";

export class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository {
    async findOneAndUpdateMessage(sender: string, recipient: string, message: string) {
        try {
            console.log('sender:', sender, 'recipient:', recipient, 'message:', message);
            const senderObjectId = new mongoose.Types.ObjectId(sender);
            const recipientObjectId = new mongoose.Types.ObjectId(recipient);
            let existingMessage = await Message.findOne({
                participants: {
                    $all: [senderObjectId, recipientObjectId]
                }
            });
            if (!existingMessage) {
                existingMessage = new Message({
                    participants: [senderObjectId, recipientObjectId],
                    messages: [],
                    lastUpdated: new Date()
                });
            }
            existingMessage.messages.push({
                sender: senderObjectId,
                text: message,
                timestamp: new Date()
            });
            existingMessage.lastUpdated = new Date();
            const response = await existingMessage.save();
            console.log(response, 'response');

            return response
        } catch (error) {
            throw error
        }
    }

    async getChatHistory(userId: string, selectedUserId: string) {
        try {
            const userIdObjectId = new mongoose.Types.ObjectId(userId);
            const selectedUserIdObjectId = new mongoose.Types.ObjectId(selectedUserId);
            return await Message.findOne({
                participants: {
                    $all: [userIdObjectId, selectedUserIdObjectId]
                }
            })
        } catch (error) {
            throw error
        }
    }
}