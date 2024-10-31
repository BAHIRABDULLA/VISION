import express from 'express'
import multer from 'multer'
import { courseController } from '../config/injection';
const router = express.Router()


const upload = multer({
    storage: multer.memoryStorage(),
});



router.post('/',upload.single('image'),courseController.createCourse.bind(courseController));
router.get('/',courseController.getAllCourses.bind(courseController));
router.get('/:id',courseController.getCourseDetails.bind(courseController))


export default router  
