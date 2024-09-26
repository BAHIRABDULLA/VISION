import express,{Request,Response} from 'express'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
import connectMongodb from './config/config'
import userRoute from './routes/userRoute'

connectMongodb()

app.use('/',userRoute)
app.get('/',(req:Request,res:Response)=>{
    res.send('its here ')
})




app.listen(4001,()=>console.log('server running on http://localhost:4001 '))
