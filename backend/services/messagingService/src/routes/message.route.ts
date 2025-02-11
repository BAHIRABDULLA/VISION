import express from 'express'
import authenticateToken from '../middleware/auth.middleware'
import { messageController } from '../config/container'

const route = express.Router()

route.get('/chat-history/:userId/:selectedUserId', authenticateToken,messageController.getChatHistory.bind(messageController))


export default route