import connectMongodb from './config/db.config'
import express from 'express'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { createStream } from 'rotating-file-stream'
import path from 'path'



const app = express()
import { authService, userService } from './config/container'

// app.use(morgan('dev'))
dotenv.config()
rabbitmqConnect().then(()=>{
    consumerMentorQueue(userService,authService)
})
connectMongodb().then(()=>{
    console.log('its connected boro');
    
})
console.log(process.env.ACCESS_TOKEN_SECRET,'libuv check')
app.use(cookieParser())

// app.use(cors({
//     origin:'https://vision.bahirabdulla.online',
//     credentials:true
// }))

const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs') 
  });
  
  app.use(morgan('combined',{stream:accessLogStream}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'

import { consumerMentorQueue } from './events/rabbitmq/consumers/consumer'
import errorHandler from './middleware/error.handler'

app.use('/user/', authRoute)
app.use('/user/', userRoute)
app.use(errorHandler)


app.listen(4001, () => console.log('server running on http://localhost:4001 '))