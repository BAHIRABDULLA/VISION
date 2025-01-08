import { IResource } from "../../interfaces/IResource";
import { IBaseRepository } from "./IBase.repository";


export interface IResourceRepository extends IBaseRepository<IResource> {
    findAllWithPopulateCourse():Promise<Partial<IResource[]> | null>
    findByIdWithCourse(id:string):Promise<Partial<IResource> | null>
}
