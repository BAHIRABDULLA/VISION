import express from 'express'
import dotenv from 'dotenv'
import router from './routes/admin.route'
import connectMongodb from './config/db.config'
import { rabbitmqConnect } from './config/rabbitmq'
import errorHandler from './middleware/error.handler'
import cookieParser from 'cookie-parser'
import { createStream } from 'rotating-file-stream'
import path from 'path'
import morgan from 'morgan'

dotenv.config()

const app = express()

rabbitmqConnect()

app.use(cookieParser())
// app.use(cors({
//     origin: 'https://vision.bahirabdulla.online',
//     credentials: true
// }))

app.use(express.json())
const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs') 
});

app.use(morgan('combined',{stream:accessLogStream}))


app.use('/admin/', router)
app.use(errorHandler)

connectMongodb()


const port = 4003
app.listen(port, () => console.log(`server running on http://localhost:${port}`))