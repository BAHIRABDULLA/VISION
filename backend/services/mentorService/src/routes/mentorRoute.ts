import express from 'express'
const router = express.Router()

import { mentorController } from '../controllers/mentorController'

router.post('/apply_mentor-1',mentorController.applyMentor1)
router.post('/apply_mentor-2',mentorController.applyMentor2)

export default router