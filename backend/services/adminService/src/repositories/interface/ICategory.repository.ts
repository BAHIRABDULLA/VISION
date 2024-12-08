import { ICategory } from "../../models/category.model";
import { IBaseRepository } from "./IBase.repository";


export interface ICategoryRepository extends IBaseRepository<ICategory> {
    findByCategoryName(category:string):Promise<ICategory  | null>
}