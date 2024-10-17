import connectMongodb from './config/db.config'
import express from 'express'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'
import dotenv from 'dotenv'
import morgan from 'morgan'


const app = express()

app.use(morgan('dev'))
dotenv.config()
rabbitmqConnect()
connectMongodb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'


app.use('/', authRoute)
app.use('/', userRoute)


app.listen(4001, () => console.log('server running on http://localhost:4001 '))
