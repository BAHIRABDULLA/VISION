import express from 'express'
import dotenv from 'dotenv'
import router from './routes/admin.route'
import cors from 'cors'
import connectMongodb from './config/db.config'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/',router)

connectMongodb()


const port = 4003
app.listen(port,()=>console.log(`server running on http://localhost:${port}`))