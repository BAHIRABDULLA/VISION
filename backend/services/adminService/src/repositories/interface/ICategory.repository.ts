import { ICategory } from "../../interface/ICategory";
import { IBaseRepository } from "./IBase.repository";


export interface ICategoryRepository extends IBaseRepository<ICategory> {
    findByCategoryName(category:string):Promise<ICategory  | null>
}