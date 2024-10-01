import express,{Request,Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send('mentor service initialized correclty')
})
const port = process.env.PORT

app.listen(port,()=>console.log(`server running on http://localhost:${port}`))