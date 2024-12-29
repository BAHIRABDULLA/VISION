import { ConversationController } from "../controllers/conversation.controller";
import { MessageController } from "../controllers/message.controller";
import { UserController } from "../controllers/user.controller";
import Conversation from "../models/conversation.model";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { ConversationRepository } from "../repositories/implementation/conversation.repository";
import { MessageRepository } from "../repositories/implementation/message.repository";
import { UserRepository } from "../repositories/implementation/user.repository";
import { ConversationService } from "../services/implementation/conversation.service";
import { MessageService } from "../services/implementation/message.service";
import { UserService } from "../services/implementation/user.service";




const userRepository = new UserRepository(User)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const messageRepository = new MessageRepository(Message)
const messageService = new MessageService(messageRepository)
const messageController = new MessageController(messageService)

const conversationRepository = new ConversationRepository(Conversation)
const conversationService = new ConversationService(conversationRepository)
const conversationController = new ConversationController(conversationService)

export {userService,userRepository,userController,messageController,messageService,conversationController}