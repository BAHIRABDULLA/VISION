import 'reflect-metadata'
import express from 'express'
import { container } from '../config/inversify.config'
const router = express.Router()

import { AdminController } from '../controllers/admin.controller'
import { TYPES } from '../types'
import authMiddleware from '../middleware/auth.middleware'


const adminController  = container.get<AdminController>(TYPES.AdminController)

router.post('/login',adminController.loginControl.bind(adminController))
router.get('/users',authMiddleware,adminController.getAllUsers.bind(adminController))
router.get('/users/:id',authMiddleware,adminController.getUserById.bind(adminController))
router.get('/refresh-token/', adminController.setNewAccessToken.bind(adminController))
router.post('/logout',  adminController.logout.bind(adminController))

export default router