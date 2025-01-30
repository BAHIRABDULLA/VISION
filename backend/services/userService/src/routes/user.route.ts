import express from 'express'
import authenticateToken from '../middleware/auth.middleware'
import multer from 'multer'

import { userController } from '../config/container'

const userRoute = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
});


userRoute.post('/generate-signed-url', authenticateToken, userController.generateSignedUrl.bind(userController))
userRoute.get('/users', userController.getAllUsers.bind(userController))
userRoute.get('/users/:id', userController.getUserById.bind(userController))
userRoute.patch('/:id/approval', userController.updateUserApprovalStatus.bind(userController));
userRoute.patch('/:id/status',userController.updateUserStatus.bind(userController))
userRoute.get('/', authenticateToken, userController.getUser.bind(userController))
// userRoute.post('/', authenticateToken,upload.single('file'),userController.profileUpdate.bind(userController))
userRoute.put('/', authenticateToken,userController.profileUpdate.bind(userController))


export default userRoute
