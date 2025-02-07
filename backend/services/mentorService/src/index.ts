import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.config'
import mentorRoute from './routes/mentor.route'
import slotRoute from './routes/slot.route'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'
import { consumerMentorQueue } from './events/rabbitmq/consumers/consumer'
import morgan from 'morgan'
import errorHandler from './middleware/error.handler'
import { consumerMentorApprovalQueue } from './events/rabbitmq/consumers/mentorApproval'
import { receiveMessage } from './events/rabbitmq/consumers/payment.consumer'
import { receiveCategoryMessage } from './events/rabbitmq/consumers/category.consumer'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

rabbitmqConnect()
.then(()=>{    
    consumerMentorQueue('userExchange', 'mentorQueue')
    consumerMentorApprovalQueue()
    receiveMessage()    
    receiveCategoryMessage('categoryQueue')
}).catch((error)=>console.error('Failed to connect rabbitmq ',error))


connectDb()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
// app.use(morgan('dev'))

app.use('/slots',slotRoute)
app.use('/',mentorRoute)
app.use(errorHandler)
const port = process.env.PORT

app.listen(port,()=>console.log(`server running on http://localhost:${port}`))