import express from 'express'

const route = express.Router()

import { reviewController } from '../config/container'
import authenticateToken from '../middleware/auth.middleware'

route.post('/create',authenticateToken,reviewController.createReview.bind(reviewController))
route.get('/:courseIdOrMentorId',reviewController.getReviewsBycourseIdOrMentorId.bind(reviewController))

export default route