import express from 'express'

const route = express.Router()


import { authController } from '../controllers/authController'

const {signUp,verifyOtp,resendOtp,googleSignIn,signIn,
    forgetPassword,resetPassword} = authController

route.post('/signup',signUp)
route.post('/otp-signup',verifyOtp)
route.post('/otp-resend',resendOtp)
route.post('/google-signin',googleSignIn)
route.post('/signin',signIn)
route.post('/forget-password',forgetPassword)
route.post('/reset-password',resetPassword)

export default route
