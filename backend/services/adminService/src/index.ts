import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/admin.route'
import cors from 'cors'

dotenv.config()

console.log('this is in admin service');


const app = express()

app.use(express.json())
app.use(cors())
app.use('/',router)
const connectMongodb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/vision_admin')
        console.log('mongodb connected');
    } catch (error) {
        console.log('failed to connect database',error)
    }
}
connectMongodb()

app.get('/',(req,res)=>{
    res.send('request sented ')
})

const port = 4003
app.listen(port,()=>console.log(`server running on http://localhost:${port}`))