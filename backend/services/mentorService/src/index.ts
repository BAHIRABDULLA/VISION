import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.config'
import router from './routes/mentor.route'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'
import { consumerMentorQueue } from './events/rabbitmq/consumer'
import morgan from 'morgan'

const app = express()

app.use(express.json())

dotenv.config()
rabbitmqConnect()
    .then(()=>{
        console.log('error herer  bro ....');
        
        consumerMentorQueue()
    }).catch((error)=>console.error('Failed to connect rabbitmq '))

connectDb()
app.use(cors())
app.use(morgan('dev'))

app.use('/',router)
const port = process.env.PORT

app.listen(port,()=>console.log(`server running on http://localhost:${port}`))