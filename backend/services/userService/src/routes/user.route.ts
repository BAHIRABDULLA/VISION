import express from 'express'

const userRoute = express.Router()


import userController from '../controllers/user.controller'
import authenticateToken from '../middleware/auth.middleware'

userRoute.get('/users',userController.getAllUsers)
userRoute.get('/users/:id',userController.getUserById)
userRoute.patch('/users/:id', userController.updateUserStatus);
userRoute.get('/user/',authenticateToken,userController.getUser)


export default userRoute
