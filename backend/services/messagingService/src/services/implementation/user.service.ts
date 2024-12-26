import { IUserRepository } from "../../repositories/interface/IUser.repository";
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
}