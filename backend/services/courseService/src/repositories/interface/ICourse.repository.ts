import ICourse from "../../interfaces/ICourse";
import { IBaseRepository } from "./IBase.repository";


interface ICourseRepository extends IBaseRepository<ICourse> {
    findByName(name: string): Promise<ICourse | null>
}

export { ICourseRepository }