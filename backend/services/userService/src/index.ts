import connectMongodb from './config/db.config'
import express from 'express'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'


const app = express()
import { authService, userService } from './config/container'

app.use(morgan('combined'))
dotenv.config()
rabbitmqConnect().then(()=>{
    consumerMentorQueue(userService,authService)
})
connectMongodb().then(()=>{
    console.log('its connected boro');
    
})
app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload())

import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'

import { consumerMentorQueue } from './events/rabbitmq/consumers/consumer'
// import { UserRepository } from './repositories/implementation/user.repository'
// import { OtpRepository } from './repositories/implementation/otp.repository'
// import { User } from './models/user.model'
// import Otp from './models/otp.model'
// import { MentorRepository } from './repositories/implementation/mentor.repository'
// import { Mentor } from './models/mentor.model'
// import { AuthService } from './services/implementation/auth.service'
// import { UserService } from './services/implementation/user.service'
// import { AuthController } from './controllers/auth.controller'
// import { UserController } from './controllers/user.controller'



app.use('/', authRoute)
app.use('/', userRoute)


// const userRepository = new UserRepository(User)
// const otpRepository = new OtpRepository(Otp)
// const mentorRepository = new MentorRepository(Mentor)
// const authService = new AuthService(userRepository,otpRepository)
// const userService = new UserService(userRepository,mentorRepository)

// const authController = new AuthController(authService)
// const userController = new UserController(userService)

// export {authController,userController}

app.listen(4001, () => console.log('server running on http://localhost:4001 '))
