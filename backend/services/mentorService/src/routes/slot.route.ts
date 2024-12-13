import express from 'express'
import authenticateToken from '../middleware/token.middleware'

const router = express.Router()

import { slotController } from '../config/container'

router.post('/booking',authenticateToken,slotController.bookingSlot.bind(slotController))
router.delete('/:id',authenticateToken,slotController.deleteSlot.bind(slotController))
router.get('/',authenticateToken,slotController.getSlot.bind(slotController))
router.post('/',authenticateToken,slotController.createSlot.bind(slotController))
export default router
