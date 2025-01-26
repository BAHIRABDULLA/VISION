
import express from 'express'
import multer from 'multer'
import authenticateToken from '../middleware/token.middleware'

const router = express.Router()
import { mentorController } from '../config/container'

const upload = multer({dest:'src/uploads/'})


router.post('/apply-mentor',upload.single('file'),mentorController.applyMentor.bind(mentorController))
router.get('/mentors',mentorController.getAllMentors.bind(mentorController))
router.get('/category',mentorController.getAllCategories.bind(mentorController))
router.get('/users/:id',mentorController.getMentor.bind(mentorController))
router.patch('/session-price',authenticateToken,mentorController.updateMentorSessionPrice.bind(mentorController))
router.patch('/:id',mentorController.updateMentor.bind(mentorController))
router.get('/eg',authenticateToken,mentorController.getMentorDetails.bind(mentorController))
router.get('/:id',mentorController.getMentorSpecificData.bind(mentorController))
router.get('/',mentorController.getAllmentorWithMergedUserData.bind(mentorController))

export default router