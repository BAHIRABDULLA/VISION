

// src/config/dependencyContainer.ts
import { AuthController } from '../controllers/implemention/auth.controller';
import { UserController } from '../controllers/implemention/user.controller';
import { AuthService } from '../services/implementation/auth.service';
import { UserService } from '../services/implementation/user.service';
import { UserRepository } from '../repositories/implementation/user.repository';
import { OtpRepository } from '../repositories/implementation/otp.repository';
import { MentorRepository } from '../repositories/implementation/mentor.repository';
import { User } from '../models/user.model';
import Otp from '../models/otp.model';
import { Mentor } from '../models/mentor.model';


import { IAuthService } from '../services/interface/IAuth.service';

// Repositories
const userRepository = new UserRepository(User);
const otpRepository = new OtpRepository(Otp);
const mentorRepository = new MentorRepository(Mentor);

// Services
const authService = new AuthService(userRepository, otpRepository);
console.log('AuthService initialized:', !!authService);

const userService = new UserService(userRepository, mentorRepository);

// Controllers
const authController = new AuthController(authService);
const userController = new UserController(userService);


export { authController, userController, authService, userService };
