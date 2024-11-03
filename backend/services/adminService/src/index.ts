import express from 'express'
import dotenv from 'dotenv'
import router from './routes/admin.route'
import cors from 'cors'
import connectMongodb from './config/db.config'
import { rabbitmqConnect } from './config/rabbitmq'
import errorHandler from './middleware/error.handler'

dotenv.config()

const app = express()
rabbitmqConnect().then(function () {
    console.log('- - - -   rabbitmq connected admin  - - - - ');
})
app.use(express.json())
app.use(cors())


app.use('/', router)
app.use(errorHandler)

connectMongodb()


const port = 4003
app.listen(port, () => console.log(`server running on http://localhost:${port}`))