import express from 'express'
import { paymentController } from '../config/container'
import authenticateToken from '../middleware/auth.middleware'
import bodyParser from 'body-parser'


const route = express.Router()

route.post('/create-checkout-session',authenticateToken,paymentController.createSessionForStripe.bind(paymentController))
// route.post('/webhook',express.raw({type:'application/json'}),paymentController.webhookHandle.bind(paymentController))

export default route