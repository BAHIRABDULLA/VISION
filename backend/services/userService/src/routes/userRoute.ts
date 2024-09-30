import express from 'express'

const route = express.Router()


import { authController } from '../controllers/authController'

const {signUp,verifyOtp,resendOtp} = authController

route.post('/signup',signUp)
route.post('/otp-signup',verifyOtp)
route.post('/resent-otp',resendOtp)

export default route
