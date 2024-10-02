

import Admin from "../models/adminSchema"


export const adminRepository ={
    findByEmail:async(email:string)=>{
        return await Admin.findOne({email})
    }
}