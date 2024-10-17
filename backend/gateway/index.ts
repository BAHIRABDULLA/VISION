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
    target:process.env.USER_API_BASE_URL,
    changeOrigin:true
}))
app.use('/mentor',createProxyMiddleware({
    target:process.env.MENTOR_API_BASE_URL,
    changeOrigin:true
}))
app.use('/admin',createProxyMiddleware({
    target:process.env.ADMIN_API_BASE_URL,
    changeOrigin:true
}))
app.use('/course',createProxyMiddleware({
    target:targets.course,
    changeOrigin:true
}))
const port = process.env.GATEWAY_PORT
app.listen(port,()=>console.log(`server running on http://localhost:${port}`))