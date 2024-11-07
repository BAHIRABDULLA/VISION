import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv' 
import connectMongodb from './config/db.config'
dotenv.config()

const app = express()
import webhookRoute from './routes/webhook.route'
app.use('/webhook',express.raw({type:'application/json'}),webhookRoute)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectMongodb()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
import paymentRoute from './routes/payment.route'


app.use('/',paymentRoute)
const port = 4005
app.listen(port,()=>console.log('server running on http://localhost:4005'))