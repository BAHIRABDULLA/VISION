
import { userRepository } from "../repositories/userRepository"
import { hashPassword } from "../utils/hashPassword"

export const authService = {
    signUp:async(fullName:string,email:string,password:string,role:string)=>{
        console.log('here 2 nd ');
        
        const existingUser = await userRepository.findByEmail(email)
        if(existingUser){
             throw new Error('User already existed')
        }
        const hashedPassword = await hashPassword(password)
       
        const userData = {
            fullName,
            email,
            password:hashedPassword,
            role
        }
        const addUser = await userRepository.createUser(userData)
    }
}