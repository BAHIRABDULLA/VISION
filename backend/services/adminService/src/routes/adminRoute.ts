import express from 'express'

const router = express.Router()

console.log('this is admin service router');

import { adminController } from '../controllers/adminController'

router.post('/login',adminController.loginControl)
router.get('/users',adminController.getAllUsers)

export default router