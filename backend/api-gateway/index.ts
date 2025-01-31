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
    origin: 'https://vision.bahirabdulla.online',
    credentials: true
}))

const targets = {
    user: process.env.USER_SERVICE_URL,
    mentor: process.env.MENTOR_SERVICE_URL,
    admin: process.env.ADMIN_SERVICE_URL,
    course: process.env.COURSE_SERVICE_URL,
    payment: process.env.PAYMENT_SERVICE_URL,
    messaging: process.env.MESSAGING_SERVICE_URL
}


app.use('/api/user', createProxyMiddleware({
    target: targets.user,
    changeOrigin: true
}))
app.use('/api/mentor', createProxyMiddleware({
    target: targets.mentor,
    changeOrigin: true
}))
app.use('/api/admin', createProxyMiddleware({
    target: targets.admin,
    changeOrigin: true
}))
app.use('/api/course', createProxyMiddleware({
    target: targets.course,
    changeOrigin: true
}));
app.use('/api/payment', createProxyMiddleware({
    target: targets.payment,
    changeOrigin: true
}));
app.use('/api/messages', createProxyMiddleware({
    target: targets.messaging,
    changeOrigin: true,
    ws: true,
    
    // pathRewrite: { '^/messages': '' },
}))

const port = process.env.GATEWAY_PORT 
app.listen(port, () => console.log(`server running on http://localhost:${port}`))