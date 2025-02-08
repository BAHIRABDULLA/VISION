import express from 'express'
import multer from 'multer'
import adminAuthenticateToken from '../middleware/admin.auth.middleware';
import { resourceController } from '../config/injection';
const router = express.Router()


const upload = multer({
    storage: multer.memoryStorage(),
});


router.post('/generate-signed-url', adminAuthenticateToken, resourceController.generateSignedUrl.bind(resourceController))
router.patch('/status/:resourceId',adminAuthenticateToken,resourceController.updateResourceStatus.bind(resourceController))
router.get('/course/:courseId',resourceController.getResourcesByCourseId.bind(resourceController))
router.get('/:id',resourceController.getResourceById.bind(resourceController))
router.patch('/:id',adminAuthenticateToken,upload.single('file'),resourceController.editResource.bind(resourceController))
router.get('/',resourceController.getResources.bind(resourceController))
router.post('/',adminAuthenticateToken,resourceController.createResource.bind(resourceController));


export default router