import express,{Request,Response} from 'express'

const app = express()
import connectMongodb from './config/config'
import userRoute from './routes/userRoute'

connectMongodb()

app.use('/',userRoute)
app.get('/',(req:Request,res:Response)=>{
    res.send('its here ')
})




app.listen(4001,()=>console.log('server running on http://localhost:4001 '))
