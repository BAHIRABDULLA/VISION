import express from 'express'
import cors from 'cors'
import {createProxyMiddleware} from 'http-proxy-middleware'
import dotenv from 'dotenv'

const app =  express()
dotenv.config()
app.use(cors())
const targets = {
    user:process.env.USER_API_BASE_URL,
    mentor:process.env.MENTOR_API_BASE_URL,
    admin:process.env.ADMIN_API_BASE_URL,
    course:process.env.COURSE_API_BASE_URL
}

app.use('/user',createProxyMiddleware({
    target:'http://localhost:4001',
    changeOrigin:true
}))
app.use('/mentor',createProxyMiddleware({
    target:'http://localhost:4002',
    changeOrigin:true
}))
app.use('/admin',createProxyMiddleware({
    target:'http://localhost:4003',
    changeOrigin:true
}))
app.use('/course',createProxyMiddleware({
    target:targets.course,
    changeOrigin:true
}))
const port = process.env.GATEWAY_PORT
app.listen(port,()=>console.log(`server running on http://localhost:${port}`))