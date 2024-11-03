import 'reflect-metadata'
import express from 'express'
import { container } from '../config/inversify.config'
const router = express.Router()

import { AdminController } from '../controllers/admin.controller'
import { TYPES } from '../types'


const adminController  = container.get<AdminController>(TYPES.AdminController)

router.post('/login',adminController.loginControl)
router.get('/users',adminController.getAllUsers)
router.get('/users/:id',adminController.getUserById)

export default router