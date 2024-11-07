import express from 'express'
import dotenv from 'dotenv'
import router from './routes/admin.route'
import cors from 'cors'
import connectMongodb from './config/db.config'
import { rabbitmqConnect } from './config/rabbitmq'
import errorHandler from './middleware/error.handler'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

rabbitmqConnect().then( () =>{
    console.log('- - - -   rabbitmq connected admin  - - - - ');
})

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())


app.use('/', router)
app.use(errorHandler)

connectMongodb()


const port = 4003
app.listen(port, () => console.log(`server running on http://localhost:${port}`))