import express from 'express'
import { connectDb } from './config/db';
import router from './routes/course.route';
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

const app = express()


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json());
app.use(morgan('combined'))


connectDb()


app.use('/',router)


const port = process.env.PORT
app.listen(port,()=>console.log(`server listening on http://localhost:4004`))