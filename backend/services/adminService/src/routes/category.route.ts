import 'reflect-metadata'
import express from 'express'
import { container } from '../config/inversify.config'
const router = express.Router()

import { TYPES } from '../types'
import authenticateToken from '../middleware/auth.middleware'
import { CategoryController } from '../controllers/implementation/category.controller'


const categoryController  = container.get<CategoryController>(TYPES.CategoryController)

router.patch('/status/:categoryId',authenticateToken,categoryController.updateCategoryStatus.bind(categoryController))
router.patch('/:id',authenticateToken,categoryController.updateCategory.bind(categoryController))
router.get('/',categoryController.getAllCategories.bind(categoryController))
router.post('/',authenticateToken,categoryController.addNewCategory.bind(categoryController))

export default router
