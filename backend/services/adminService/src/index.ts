import express from 'express'
import dotenv from 'dotenv'
import adminRouter from './routes/admin.route'
import categoryRouter from './routes/category.route'
import cors from 'cors'
import connectMongodb from './config/db.config'
import { rabbitmqConnect } from './config/rabbitmq'
import errorHandler from './middleware/error.handler'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

rabbitmqConnect()

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())

app.use('/category',categoryRouter)
app.use('/', adminRouter)
app.use(errorHandler)

connectMongodb()


const port = 4003
app.listen(port, () => console.log(`server running on http://localhost:${port}`))