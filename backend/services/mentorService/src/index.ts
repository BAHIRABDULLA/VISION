import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDb'
import router from './routes/mentorRoute'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'
import { consumerMentorQueue } from './events/rabbitmq/consumer'


const app = express()
dotenv.config()
rabbitmqConnect()
    .then(()=>{
        consumerMentorQueue()
    }).catch((error)=>console.error('Failed to connect rabbitmq '))

connectDb()
app.use(express.json())
app.use(cors())

app.use('/',router)
const port = process.env.PORT

app.listen(port,()=>console.log(`server running on http://localhost:${port}`))