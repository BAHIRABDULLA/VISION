
import express from 'express'
import multer from 'multer'
import { MentorController } from '../controllers/mentor.controller'

const router = express.Router()
const mentorController= new MentorController()

const upload = multer({dest:'src/uploads/'})


router.post('/apply-mentor',upload.single('file'),mentorController.applyMentor)
router.get('/mentors',mentorController.getAllMentors)
router.get('/users/:id',mentorController.getMentor)

export default router