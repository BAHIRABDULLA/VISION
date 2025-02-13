import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import {  successResponse } from '../../utils/response.helper';
import { HttpStatus } from '../../enums/http.status';
import { ICategoryController } from '../interface/ICategory.controller';
import { ICategoryService } from '../../services/interface/ICategory.service';
import { SUCCESS_MESSAGES } from '../../constants';

@injectable()
export class CategoryController implements ICategoryController {

     private categoryService: ICategoryService;
        constructor(@inject(TYPES.CategoryService) categoryService: ICategoryService) {
            this.categoryService = categoryService
        }
    

    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.categoryService.getAllCategories()
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.ALL_CATEGORYS_FETCHED, { categories: response })
        } catch (error) {
            next(error)
        }
    }

    async addNewCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { data } = req.body
            const { category, skills } = req.body
            const response = await this.categoryService.addNewCategory(category, skills)
            return successResponse(res, HttpStatus.CREATED, SUCCESS_MESSAGES.CATEGORY_CREATED, response)
        } catch (error) {
            next(error)
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const { category, skills } = req.body
            const response = await this.categoryService.updateCategory(id, category, skills)
            return successResponse(res, HttpStatus.CREATED, SUCCESS_MESSAGES.CATEGORY_UPDATED, response)
        } catch (error) {
            next(error)
        }
    }

    async updateCategoryStatus(req:Request,res:Response,next:NextFunction){
        try {
            const {categoryId} = req.params
            const {status}  = req.body
            const response = await this.categoryService.updateCategoryStatus(categoryId,status)
            return successResponse(res,HttpStatus.OK,SUCCESS_MESSAGES.CATEGORY_UPDATED,response)
        } catch (error) {
            next(error)
        }
    }
}