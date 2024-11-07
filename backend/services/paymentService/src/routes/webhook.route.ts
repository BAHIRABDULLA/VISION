import express from 'express'
import { paymentController } from '../config/container'

const webhookRoute = express.Router()


webhookRoute.post('/',paymentController.webhookHandle.bind(paymentController))

export default webhookRoute