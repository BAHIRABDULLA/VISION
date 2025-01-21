import ICourse from "../../interfaces/ICourse";
import { IBaseRepository } from "./IBase.repository";


interface ICourseRepository extends IBaseRepository<ICourse> {
    findByName(name: string): Promise<ICourse | null>
    findByUserId(userId:string):Promise<any>
}

export { ICourseRepository }