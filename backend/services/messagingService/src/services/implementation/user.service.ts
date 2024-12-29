import { HttpStatus } from "../../enums/http.status";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import CustomError from "../../utils/custom.error";
import { IUserService } from "../interface/IUser.service";

export class UserService implements IUserService{
    constructor(private userRepository:IUserRepository){}

    async saveUserData(data:object){
        try {
            console.log(data,'data in rabbitmq passed datra ')
            await this.userRepository.create(data)
        } catch (error) {
            console.error('Error founded in save user data',error);
        }
    }

    async getAllUsers(userId:string){
        try {
            
            if(!userId || userId =='undefined'){
                console.log('---------------');
                throw new CustomError('Cannot found users',HttpStatus.NOTFOUND)  
            }
            const checkUser = await this.userRepository.findById(userId)
            // console.log(checkUser,'check user in get all users ');
            
            if(!checkUser){
                throw new CustomError("Cannot found users",HttpStatus.NOTFOUND)
            }
            let role = checkUser.role
            
            const response  = await this.userRepository.findUsersWithRole(role)
            // console.log(response,'resonse in after role');
            
            if(response&&response.length<1){
                console.log(' its entere not found if condition');
                
                throw new CustomError('Cannot find users',HttpStatus.NOTFOUND)
            }
            return response
        } catch (error) {
            console.error('Error founded in get all users in service',error);
            throw error
        }
    }
}