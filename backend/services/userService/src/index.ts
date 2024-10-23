import connectMongodb from './config/db.config'
import express from 'express'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'


const app = express()

app.use(morgan('combined'))
dotenv.config()
rabbitmqConnect()
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


app.use('/', authRoute)
app.use('/', userRoute)


app.listen(4001, () => console.log('server running on http://localhost:4001 '))
