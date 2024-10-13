import express from 'express'
const router = express.Router()

import { MentorController } from '../controllers/mentor.controller'

const mentorController= new MentorController()

router.post('/apply-mentor',mentorController.applyMentor)

router.get('/mentors',mentorController.getAllMentors)

export default router