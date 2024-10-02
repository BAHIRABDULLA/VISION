import express from 'express'
import dotenv from 'dotenv'
dotenv.config()


const app = express()

app.get('/',(req,res)=>{
    res.send('haai')
})
const port = process.env.PORT
app.listen(port,()=>console.log(`server running on http://localhost:${port}`))