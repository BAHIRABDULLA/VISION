

import Admin from "../models/admin.schema"


export class AdminRepository {
    async findByEmail(email:string){
        return await Admin.findOne({email})
    }
}

