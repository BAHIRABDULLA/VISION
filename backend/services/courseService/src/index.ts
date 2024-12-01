import express from 'express'
import { connectDb } from './config/db';
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import errorHandler from './middleware/error.handler';
dotenv.config()

const app = express()


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('combined'))


connectDb()

import resourceRoute from './routes/resource.route';
import courseRoute from './routes/course.route';

app.use('/',resourceRoute)
app.use('/',courseRoute)
app.use(errorHandler)

const port = process.env.PORT
app.listen(port,()=>console.log(`server listening on http://localhost:4004`))