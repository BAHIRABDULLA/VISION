import 'reflect-metadata'
import express from 'express'
import { container } from '../config/inversify.config'
const router = express.Router()

import { AdminController } from '../controllers/implementation/admin.controller'
import { TYPES } from '../types'
import authenticateToken from '../middleware/auth.middleware'


const adminController  = container.get<AdminController>(TYPES.AdminController)

router.post('/login',adminController.loginControl.bind(adminController))

router.get('/dashboard',authenticateToken,adminController.getDashbaordData.bind(adminController))
router.get('/users',adminController.getAllUsers.bind(adminController))
router.get('/users/:id',authenticateToken,adminController.getUserById.bind(adminController))
router.get('/refresh-token/', adminController.setNewAccessToken.bind(adminController))
router.post('/logout',  adminController.logout.bind(adminController))


router.get('/category',adminController.getAllCategories.bind(adminController))
router.post('/category',authenticateToken,adminController.addNewCategory.bind(adminController))
router.patch('/category/:id',authenticateToken,adminController.updateCategory.bind(adminController))

router.patch('/:id/approval',authenticateToken,adminController.mentorApproval.bind(adminController))
router.patch('/:id/status',authenticateToken,adminController.updateUserActiveStatus.bind(adminController))
export default router