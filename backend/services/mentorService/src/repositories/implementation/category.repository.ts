import { BaseRepository } from "./base.repository";
import Category, { ICategory } from "../../model/category.model";
import { ICategoryRepository } from "../interface/ICategory.repository";
export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository {

    async findOneAndUpdate(data: ICategory) {
        try {
            const response = await Category.findOneAndUpdate(
                { _id: data._id },
                { $set: data },
                {
                    new: true,
                    upsert: true
                }
            )
            return response
        } catch (error) {
            throw error
        }
    }
}