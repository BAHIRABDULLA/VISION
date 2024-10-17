import express from 'express'

const router = express.Router()

console.log('this is admin service router');

import { AdminController } from '../controllers/admin.controller'

const adminController= new AdminController()
router.post('/login',adminController.loginControl)
router.get('/users',adminController.getAllUsers)
router.get('/users/:id',adminController.getUserById)

export default router