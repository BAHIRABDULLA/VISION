import express from 'express';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

import cors from 'cors';
import messageRoute from './routes/message.route'
import conversationRoute from './routes/conversation.route'
import userRoute from './routes/user.route'
import connectMongodb from './config/db.config';
import chatSocketHandler from './sockets/chat';
import videoCallSocketHandler from './sockets/video.call';
import { rabbitmqConnect } from './config/rabbitmq';
import { setupConsumer } from './events/rabbitmq/consumers/users.consumer';
import errorHandler from './middleware/error.handler';
import { createStream } from 'rotating-file-stream';
import path from 'path';
import morgan from 'morgan'


dotenv.config()

const app = express();
rabbitmqConnect().then(() => {
  setupConsumer('userExchange', 'messagingQueue')
})
connectMongodb().catch((err) => {
  console.error('Failed to connect with mongodb', err);
  process.exit(1)
})


// app.use(cors({
//   origin: 'https://vision.bahirabdulla.online',
//   credentials: true
// }));
app.use(express.json());

const accessLogStream = createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs') 
});

app.use(morgan('combined',{stream:accessLogStream}))

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://vision.bahirabdulla.online',
    methods: ['GET', 'POST'],
    credentials: true
  },
});

const chatNamespace = io.of('/messages/chat');
const videoNamespace = io.of('/messages/video');

chatNamespace.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  chatSocketHandler(chatNamespace, socket);
});

videoNamespace.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  videoCallSocketHandler(videoNamespace, socket);
});


app.use('/messages/conversation', conversationRoute)
app.use('/messages/users', userRoute, (req, res, next) => {
  console.log(req.url, 'req.url', req.baseUrl, 'req.baseUrl');
  next()
})
app.use('/messages/', messageRoute, (req, res, next) => {
  console.log(req.url, 'req.url in /', req.baseUrl);
  next()
});
app.use(errorHandler)

const port = 4006
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});