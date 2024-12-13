import express from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const targets = {
    user: process.env.USER_API_BASE_URL,
    mentor: process.env.MENTOR_API_BASE_URL,
    admin: process.env.ADMIN_API_BASE_URL,
    course: process.env.COURSE_API_BASE_URL,
    payment: process.env.PAYMENT_API_BASE_URL,
    messaging: process.env.MESSAGING_API_BASE_URL
}


app.use('/user', createProxyMiddleware({
    target: targets.user,
    changeOrigin: true
}))
app.use('/mentor', createProxyMiddleware({
    target: targets.mentor,
    changeOrigin: true
}))
app.use('/admin', createProxyMiddleware({
    target: targets.admin,
    changeOrigin: true
}))
app.use('/course', createProxyMiddleware({
    target: targets.course,
    changeOrigin: true
}));
app.use('/payment', createProxyMiddleware({
    target: targets.payment,
    changeOrigin: true
}));
app.use('/messages', createProxyMiddleware({
    target: targets.messaging,
    changeOrigin: true,
    ws: true,
    pathRewrite: { '^/messages': '/messages' }
}))
const port = process.env.GATEWAY_PORT
app.listen(port, () => console.log(`server running on http://localhost:${port}`))