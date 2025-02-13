import { inject, injectable } from "inversify";
import Cateogry, { ICategory } from "../../models/category.model";
import { ICategoryRepository } from "../interface/ICategory.repository";
import BaseRepository from "./base.repository";
import { Model } from "mongoose";
import { TYPES } from "../../types";


@injectable()
export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository {
    constructor(
        @inject(TYPES.Category) model: Model<ICategory>
    ) {
        super(model);
    }
    async findByCategoryName(name: string) {
        try {
            return await Cateogry.findOne({ name })
        } catch (error) {
            throw error
        }
    }

   
}