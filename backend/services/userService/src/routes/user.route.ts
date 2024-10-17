import express from 'express'

const userRoute = express.Router()


import userController from '../controllers/user.controller'

userRoute.get('/users',userController.getAllUsers)
userRoute.get('/users/:id',userController.getUserById)
userRoute.patch('/users/:id', userController.updateUserStatus);


export default userRoute
