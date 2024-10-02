import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/adminRoute'
import cors from 'cors'

dotenv.config()


const app = express()

app.use(express.json())
app.use(cors())
const connectMongodb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/vision_admin')
        console.log('mongodb connected');
    } catch (error) {
        console.log('failed to connect database',error)
    }
}
connectMongodb()
app.use('/admin',router)

const port = process.env.PORT
app.listen(port,()=>console.log(`server running on http://localhost:${port}`))