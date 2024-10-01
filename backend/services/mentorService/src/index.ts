import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDb'
import router from './routes/mentorRoute'

const app = express()
dotenv.config()

connectDb()
app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send('mentor service initialized correclty')
})
app.use('/',router)
const port = process.env.PORT

app.listen(port,()=>console.log(`server running on http://localhost:${port}`))