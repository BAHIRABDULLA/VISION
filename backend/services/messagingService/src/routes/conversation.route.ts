import express from 'express'
import authenticateToken from '../middleware/auth.middleware'
import { conversationController } from '../config/container'
const router  = express.Router()



router.get('/:userId/:particpantId',authenticateToken,conversationController.getMessages.bind(conversationController))

export default router