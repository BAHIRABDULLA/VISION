import express from 'express'
import authenticateToken from '../middleware/token.middleware'
import { SlotController } from '../controllers/slot.controller'

const router = express.Router()

const slotController = new SlotController()

router.post('/',authenticateToken,slotController.createSlot)
router.get('/',slotController.getSlots)
router.delete('/:id',authenticateToken,slotController.deleteSlot)
export default router
