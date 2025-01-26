import { HttpStatus } from "../../enums/http.status";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import CustomError from "../../utils/custom.error";
import { IUserService } from "../interface/IUser.service";


export class UserService implements IUserService{
    constructor(private userRepository:IUserRepository){}

    async saveUserData(data:object){
        try {
            await this.userRepository.create(data)
        } catch (error) {
            console.error('Error founded in save user data',error);
        }
    }

    
}