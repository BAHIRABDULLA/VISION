import express from 'express'

const app = express()

app.use(express.json());

app.get('/',(req,res)=>{
    console.log('its here boy ....');
    
})
const port = process.env.PORT
app.listen(port,()=>console.log(`server listening on http://localhost:4004`))