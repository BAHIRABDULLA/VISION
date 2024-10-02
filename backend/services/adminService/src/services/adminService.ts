import bcrypt from 'bcryptjs'
import { adminRepository } from "../repositories/adminRepository"


export const adminService={
    login:async(email:string,password:string)=>{
        const admin= await adminRepository.findByEmail(email)
        if(!admin){
            return {success:false, message:"Admin not existed"}
        }
        const passwordCheck =await bcrypt.compare(password,admin.password)
        console.log(passwordCheck,'password check ');
        
        if(!passwordCheck){
            return {success:false,message:"Invalid credentials, please try again "}
        }
        return {success:true,message:"Login successfully done"}
    }
}