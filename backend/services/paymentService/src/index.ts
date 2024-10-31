import express from 'express'
import cors from 'cors'
import paymentRoute from './routes/payment.route'
 

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use('/',paymentRoute)

const port = 4005
app.listen(port,()=>console.log('server running on http://localhost:4005'))