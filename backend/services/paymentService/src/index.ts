import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv' 
import connectMongodb from './config/db.config'
import { rabbitmqConnect } from './config/rabbitmq'
dotenv.config()

const app = express()

import webhookRoute from './routes/webhook.route'
app.use('/webhook',express.raw({type:'application/json'}),webhookRoute)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectMongodb()
rabbitmqConnect().then(()=>{
    setupConsumer('userExchange', 'paymentQueue')
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

import paymentRoute from './routes/payment.route'
import reviewRoute from './routes/review.route'
import bookingRoute from './routes/booking.route'
import errorHandler from './middleware/error.handler'
import { setupConsumer } from './events/rabbitmq/consumer/users.consumer'


app.use('/review',reviewRoute)
app.use('/booking',bookingRoute)
app.use('/',paymentRoute)

app.use(errorHandler)

const port = 4005
app.listen(port,()=>console.log('server running on http://localhost:4005'))