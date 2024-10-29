import express from 'express'
import dotenv from 'dotenv'
import router from './routes/admin.route'
import cors from 'cors'
import connectMongodb from './config/db.config'
import { rabbitmqConnect } from './config/rabbitmq'
import { AdminService } from './services/admin.service'

dotenv.config()

const app = express()
rabbitmqConnect().then(function () {
    console.log('- - - -   rabbitmq connected admin  - - - - ');
})
app.use(express.json())
app.use(cors())


export const adminService = new AdminService()
app.use('/', router)

connectMongodb()


const port = 4003
app.listen(port, () => console.log(`server running on http://localhost:${port}`))