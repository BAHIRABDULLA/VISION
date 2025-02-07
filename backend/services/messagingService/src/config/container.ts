import { MessageController } from "../controllers/implementation/message.controller";
import { UserController } from "../controllers/implementation/user.controller";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { MessageRepository } from "../repositories/implementation/message.repository";
import { UserRepository } from "../repositories/implementation/user.repository";
import { MessageService } from "../services/implementation/message.service";
import { UserService } from "../services/implementation/user.service";




const userRepository = new UserRepository(User)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const messageRepository = new MessageRepository(Message)
const messageService = new MessageService(messageRepository)
const messageController = new MessageController(messageService)



export {userService,userRepository,userController,messageController,messageService}