import { ICategory } from "../../model/category.model";
import { IBaseRepository } from "./IBase.repository";


export interface ICategoryRepository extends IBaseRepository<ICategory> {
    findOneAndUpdate(data: ICategory): Promise<ICategory | null>
}