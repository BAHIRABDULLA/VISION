import express from 'express'
import { connectDb } from './config/db';
import cors from 'cors'
import morgan from 'morgan'
import {createStream} from 'rotating-file-stream';
import path from 'path'
import dotenv from 'dotenv'
import errorHandler from './middleware/error.handler';
import { rabbitmqConnect } from './config/rabbitmq';
dotenv.config()

const app = express()


// app.use(cors({
//     origin:'https://vision.bahirabdulla.online',
//     credentials:true
// }))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs') 
});

app.use(morgan('combined',{stream:accessLogStream}))


connectDb()
rabbitmqConnect().then(()=>{
    receiveMessage()
})

import resourceRoute from './routes/resource.route';
import courseRoute from './routes/course.route';
import { receiveMessage } from './events/rabbitmq/consumer';
app.use((req,res,next)=>{
    console.log(req.url,'req.url in app.use');
    next()
})
app.use('/resource',resourceRoute)
app.use('/',courseRoute)

app.use(errorHandler)

const port = 4004
app.listen(port,()=>console.log(`server listening on http://localhost:4004`))