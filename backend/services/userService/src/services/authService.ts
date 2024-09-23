
import { userRepository } from "../repositories/userRepository"
import 

export const authService = {
    signUp:async(fullName:string,email:string,password:string)=>{
        const existingUser = await userRepository.findByEmail(email)
        if(existingUser){
             throw new Error('User already existed')
        }
        
    }
}