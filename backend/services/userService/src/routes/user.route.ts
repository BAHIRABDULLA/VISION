import express from 'express'
import authenticateToken from '../middleware/auth.middleware'
import multer from 'multer'

import { userController } from '../config/container'


// const upload = multer({dest:'src/uploads/'})


const userRoute = express.Router()

// const storage = multer.memoryStorage(); // Store files in memory
// const upload = multer({ storage });


// const upload = multer({dest:'src/uploads/'})
const upload = multer({
    storage: multer.memoryStorage(),
});

userRoute.get('/users', userController.getAllUsers)
userRoute.get('/users/:id', userController.getUserById)
userRoute.patch('/:id/approval', userController.updateUserStatus);
userRoute.get('/', authenticateToken,(req,res)=> userController.getUser(req,res))
userRoute.post('/', authenticateToken,upload.single('file'),userController.profileUpdate.bind(userController))

export default userRoute
