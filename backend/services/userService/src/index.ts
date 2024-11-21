import connectMongodb from './config/db.config'
import express from 'express'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'


const app = express()
import { authService, userService } from './config/container'

app.use(morgan('dev'))
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

import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'

import { consumerMentorQueue } from './events/rabbitmq/consumers/consumer'

app.use('/', authRoute)
app.use('/', userRoute)


app.listen(4001, () => console.log('server running on http://localhost:4001 '))
