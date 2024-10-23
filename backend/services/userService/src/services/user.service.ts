import { User } from "../models/user.model";
import { UserRepository } from "../repositories/implementation/user.repository";

export class UserService {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository(User)
    }

    async getAllUsers() {
        try {
            return await this.userRepository.findAll()
        } catch (error) {
            console.error('Error founded in get all users',error);
        }
    }


    async getUser(id: string) {
        try {
            return await this.userRepository.findById(id)
        } catch (error) {
            console.error('Error founded in get user', error);
        }
    }

}