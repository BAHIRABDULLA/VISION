import express from 'express'

const authRoute = express.Router()


import authController from '../controllers/auth.controller'


authRoute.post('/signup',authController.signup)
authRoute.post('/otp-signup',authController.verifyOtp)
authRoute.post('/otp-resend',authController.resendOtp)
authRoute.post('/signin',authController.signin)
authRoute.post('/google-signin',authController.googleLogin)
authRoute.post('/forget-password',authController.forgetPassword)
authRoute.post('/reset-password',authController.resetPassword)
authRoute.get('/refresh-token',authController.setNewAccessToken)
authRoute.post('/update-mentor-form',authController.updateMentorForm)


export default authRoute
