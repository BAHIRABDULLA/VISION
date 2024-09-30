import express from 'express'

const route = express.Router()


import { authController } from '../controllers/authController'

const {signUp,verifyOtp} = authController

route.post('/signup',signUp)
route.post('/otp-signup',verifyOtp)

export default route
