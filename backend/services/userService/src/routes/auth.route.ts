import express from 'express'

import { authController } from '../config/container'
import authenticateToken from '../middleware/auth.middleware'


const authRoute = express.Router()



authRoute.post('/signup', (req, res) => authController.signup(req, res))
authRoute.post('/otp-signup', (req, res) => authController.verifyOtp(req, res))
authRoute.post('/otp-resend', (req, res) => authController.resendOtp(req, res))
// authRoute.post('/signin',authController.signin.bind(authController))
authRoute.post('/signin', (req, res) => authController.signin(req, res))
authRoute.post('/google-signin', (req, res) => authController.googleLogin(req, res))
authRoute.post('/forget-password', (req, res) => authController.forgetPassword(req, res))
authRoute.post('/reset-password', (req, res) => authController.resetPassword(req, res))
authRoute.get('/refresh-token/', (req, res) => authController.setNewAccessToken(req, res))
authRoute.get('/refresh-token/mentor', (req, res) => authController.setNewAccessTokenMentor(req, res))
// authRoute.post('/update-mentor-form',authController.updateMentorForm)

authRoute.patch('/change-password',authenticateToken,(req,res)=>authController.changePassowrd(req,res))
authRoute.post('/logout', (req, res) =>  authController.logout(req, res))

export default authRoute
