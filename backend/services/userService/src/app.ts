import express,{Request,Response} from 'express'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
rabbitmqConnect()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
import connectMongodb from './config/config'
import userRoute from './routes/userRoute'

connectMongodb()

app.use('/',userRoute)


app.listen(4001,()=>console.log('server running on http://localhost:4001 '))
