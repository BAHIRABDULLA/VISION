import express from 'express'

const route = express.Router()


import { authController } from '../controllers/authController'

const {signUp,verifyOtp,resendOtp,googleSignIn,signIn} = authController

route.post('/signup',signUp)
route.post('/otp-signup',verifyOtp)
route.post('/otp-resend',resendOtp)
route.post('/google-signin',googleSignIn)
route.post('/signin',signIn)

export default route
