import { IAdmin } from "../../interface/IAdmin";


export interface IAdminRepository {
    findByEmail(email:string):Promise<IAdmin | null>
}