import express from 'express'
import authenticateToken from '../middleware/auth.middleware'
import multer from 'multer'

import { userController } from '../config/container'

const userRoute = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
});

userRoute.get('/users', userController.getAllUsers.bind(userController))
userRoute.get('/users/:id', userController.getUserById.bind(userController))
userRoute.patch('/:id/approval', userController.updateUserStatus.bind(userController));
userRoute.get('/', authenticateToken,(req,res)=> userController.getUser(req,res))
userRoute.post('/', authenticateToken,upload.single('file'),userController.profileUpdate.bind(userController))

export default userRoute
