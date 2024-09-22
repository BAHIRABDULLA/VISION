import express,{Request,Response} from 'express'

const app = express()


app.get('/',(req:Request,res:Response)=>{
    res.send('its here ')
})

app.listen(4001,()=>console.log('server running on http://localhost:4001 '))
