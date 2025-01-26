import express from 'express'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import {createStream} from 'rotating-file-stream';
import path from 'path'

dotenv.config()

const app = express()


// const logDirectory = path.join(__dirname,'logs')
// if(!fs.existsSync(logDirectory)){
//     fs.mkdirSync(logDirectory)
// }
const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs') 
});

app.use(morgan('combined',{stream:accessLogStream}))
const limiter = rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:'Too many requests, please try again later'
})
// app.use(limiter)
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
    
    // pathRewrite: { '^/messages': '' },
    // pathRewrite: { '^/messages': '/messages' }
}))
const port = process.env.GATEWAY_PORT 
app.listen(port, () => console.log(`server running on http://localhost:${port}`))