import express from 'express'
import { connectDb } from './config/db';
import router from './routes/courseRoute';


const app = express()
app.use(express.json());

connectDb()

app.use('/',router)


const port = process.env.PORT
app.listen(port,()=>console.log(`server listening on http://localhost:4004`))