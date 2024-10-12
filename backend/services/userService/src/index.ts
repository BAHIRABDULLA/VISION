import express,{Request,Response} from 'express'
import cors from 'cors'
import { rabbitmqConnect } from './config/rabbitmq'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
rabbitmqConnect()

console.log('dfdsjfkdsjkj');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
import connectMongodb from './config/db.config'
import authRoute from './routes/auth.route' 
import userRoute from './routes/user.route'

connectMongodb()

app.use('/',authRoute)
app.use('/',userRoute)


app.listen(4001,()=>console.log('server running on http://localhost:4001 '))
