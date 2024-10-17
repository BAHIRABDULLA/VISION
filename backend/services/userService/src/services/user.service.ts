import { User } from "../models/user.model";
import { UserRepository } from "../repositories/implementation/user.repository";

export class UserService {
    private userRepository:UserRepository
    constructor(){
        this.userRepository = new UserRepository(User)
    }

    async getAllUsers(){
        return await this.userRepository.findAll()
    }
    async getUser(id:string){
        return await this.userRepository.findById(id)
    }
}