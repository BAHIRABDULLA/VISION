import express from 'express'
import multer from 'multer'
import adminAuthenticateToken from '../middleware/admin.auth.middleware';
import { resourceController } from '../config/injection';
const router = express.Router()


const upload = multer({
    storage: multer.memoryStorage(),
});

router.post('/resource',adminAuthenticateToken,upload.single('content'),resourceController.createResourse.bind(resourceController));


export default router