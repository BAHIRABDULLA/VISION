import express from 'express'
import multer from 'multer'
import { courseController } from '../config/injection';
import adminAuthenticateToken from '../middleware/admin.auth.middleware';
const router = express.Router()


const upload = multer({
    storage: multer.memoryStorage(),
});



router.post('/',adminAuthenticateToken,upload.single('image'),courseController.createCourse.bind(courseController));
router.get('/',courseController.getAllCourses.bind(courseController));
router.get('/:id',courseController.getCourseDetails.bind(courseController))

router.patch('/:id',adminAuthenticateToken,upload.single('image'),courseController.editCourse.bind(courseController))
router.patch('/status/:id',adminAuthenticateToken,courseController.editCourseStatus.bind(courseController))

export default router  
