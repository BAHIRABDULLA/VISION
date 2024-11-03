import { IAdmin } from "../../models/admin.model";


export interface IAdminRepository {
    findByEmail(email:string):Promise<IAdmin | null>
}