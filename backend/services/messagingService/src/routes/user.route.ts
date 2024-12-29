
import express from 'express'
import authenticateToken from '../middleware/auth.middleware'
import { userController } from '../config/container'
const router = express.Router()




router.get('/:userId',authenticateToken,userController.getAllUsers.bind(userController))


export default router