import { ICategory } from "../../models/category.model"


export interface ICategoryService {

    getAllCategories(): Promise<Partial<ICategory[]> | null>
    addNewCategory(category: string, skills: string[]): Promise<ICategory | null>
    updateCategory(id: string, category: string, skills: string[]): Promise<ICategory | null>
    updateCategoryStatus(categoryId: string, status: 'active' | 'block'): Promise<ICategory | null>

}