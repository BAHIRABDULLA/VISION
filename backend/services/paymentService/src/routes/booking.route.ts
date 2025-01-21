
import express from 'express' 
import authenticateToken from '../middleware/auth.middleware'
import { bookingController } from '../config/container'

const router = express.Router()


router.post('/create',authenticateToken,bookingController.createBooking.bind(bookingController))

export default router