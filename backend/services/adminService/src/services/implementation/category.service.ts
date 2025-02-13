import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ICategoryService } from '../interface/ICategory.service'
import { ICategoryRepository } from '../../repositories/interface/ICategory.repository'
import CustomError from '../../utils/custom.error'
import { ERROR_MESSAGES, RABBITMQ_EXCHANGE } from '../../constants'
import { HttpStatus } from '../../enums/http.status'
import { publishMessage } from '../../events/rabbitmq/producer'




@injectable()
export class CategoryService implements ICategoryService {
    private categoryRepository: ICategoryRepository
    constructor(
        @inject(TYPES.CategoryRepository) categoryRepository: ICategoryRepository
    ) {
        this.categoryRepository = categoryRepository
    }


    async getAllCategories() {
        try {
            const response = await this.categoryRepository.findAll()
            return response
        } catch (error) {
            throw error
        }
    }


    async addNewCategory(category: string, skills: string[]) {
        try {
            const findExistingCategory = await this.categoryRepository.findByCategoryName(category)
            if (findExistingCategory) {
                throw new CustomError(ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS, HttpStatus.FORBIDDEN)
            }
            const data = {
                name: category,
                skills
            }
            const response = await this.categoryRepository.create(data)
            await publishMessage(RABBITMQ_EXCHANGE.CATEGORY_EXCHANGE, response)
            if (!response) {
                throw new CustomError(ERROR_MESSAGES.ERROR_CREATING_CATEGORY, HttpStatus.FORBIDDEN)
            }
            return response
        } catch (error) {
            throw error
        }
    }

    async updateCategory(id: string, category: string, skills: string[]) {
        try {

            const findCategory = await this.categoryRepository.findById(id)
            if (!findCategory) {
                throw new CustomError(ERROR_MESSAGES.CATEGORY_NOT_FOUND, HttpStatus.NOTFOUND)
            }
            const response = await this.categoryRepository.update(id, { name: category, skills })
            await publishMessage(RABBITMQ_EXCHANGE.CATEGORY_EXCHANGE, response!)
            return response
        } catch (error) {
            throw error
        }
    }

    async updateCategoryStatus(categoryId:string,status:'active'|'block'){
        try {
            const response  = await this.categoryRepository.update(categoryId,{status})
            await publishMessage(RABBITMQ_EXCHANGE.CATEGORY_EXCHANGE, response!)
            return response
        } catch (error) {
            throw error
        }
    }
}