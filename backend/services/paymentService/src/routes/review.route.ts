import express from 'express'

const route = express.Router()

import { reviewController } from '../config/container'
import authenticateToken from '../middleware/auth.middleware'

route.get('/course/:courseId',reviewController.getReviewsByCourseId.bind(reviewController))
route.post('/course/create',authenticateToken,reviewController.createCourseReview.bind(reviewController))

export default route