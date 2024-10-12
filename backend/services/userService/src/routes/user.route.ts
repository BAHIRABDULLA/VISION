import express from 'express'

const userRoute = express.Router()


import userController from '../controllers/user.controller'

userRoute.get('/users',userController.getAllUsers)



export default userRoute
