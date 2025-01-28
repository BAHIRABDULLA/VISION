import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv' 
import connectMongodb from './config/db.config'
import { rabbitmqConnect } from './config/rabbitmq'
import morgan from 'morgan'

dotenv.config()

const app = express()

import webhookRoute from './routes/webhook.route'
app.use('/payment/webhook',express.raw({type:'application/json'}),webhookRoute)

const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs') 
  });
  
  app.use(morgan('combined',{stream:accessLogStream}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectMongodb()
rabbitmqConnect().then(()=>{
    setupConsumer('userExchange', 'paymentQueue')
})

// app.use(cors({
//     origin: 'https://vision.bahirabdulla.online',
//     credentials: true
// }))

import paymentRoute from './routes/payment.route'
import reviewRoute from './routes/review.route'
import bookingRoute from './routes/booking.route'
import errorHandler from './middleware/error.handler'
import { setupConsumer } from './events/rabbitmq/consumer/users.consumer'
import { createStream } from 'rotating-file-stream'
import path from 'path'


app.use('/payment/review',reviewRoute)
app.use('/payment/booking',bookingRoute)
app.use('/payment/',paymentRoute)

app.use(errorHandler)

const port = 4005
app.listen(port,()=>console.log('server running on http://localhost:4005'))