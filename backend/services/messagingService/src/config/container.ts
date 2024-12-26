import { User } from "../models/user.model";
import { UserRepository } from "../repositories/implementation/user.repository";
import { UserService } from "../services/implementation/user.service";




const userRepository = new UserRepository(User)
const userService = new UserService(userRepository)

export {userService}