
import { injectable } from "inversify"
import Admin from "../../models/admin.model"
import { IAdminRepository } from "../interface/IAdmin.repository"

@injectable()
export class AdminRepository implements IAdminRepository {
    async findByEmail(email:string){
        return await Admin.findOne({email})
    }
}

