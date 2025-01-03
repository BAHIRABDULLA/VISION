import express from 'express'
import multer from 'multer'
import adminAuthenticateToken from '../middleware/admin.auth.middleware';
import { resourceController } from '../config/injection';
const router = express.Router()


const upload = multer({
    storage: multer.memoryStorage(),
});

router.get('/',resourceController.getResources.bind(resourceController))
router.post('/',adminAuthenticateToken,upload.single('content'),resourceController.createResource.bind(resourceController));


export default router