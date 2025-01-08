import express from 'express';
import { Server } from 'socket.io';
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



dotenv.config()

const app = express();
rabbitmqConnect().then(() => {
  setupConsumer('userExchange', 'messagingQueue')
})
connectMongodb().catch((err) => {
  console.error('Failed to connect with mongodb', err);
  process.exit(1)
})


app.use(cors({
  origin: 'http://vision.bahirabdulla.online',
  credentials: true
}));
app.use(express.json());



const server = http.createServer(app);
const io = new Server(server, {
  path: '/messages',
  cors: {
    origin: 'http://vision.bahirabdulla.online',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports:['websocket','polling']
  

});

const chatNamespace = io.of('/chat');
const videoNamespace = io.of('/video');

// chatNamespace.on('connection', (socket) => {
//   chatSocketHandler(chatNamespace, socket);
// });

// videoNamespace.on('connection', (socket) => {
//   videoCallSocketHandler(videoNamespace, socket);
// });

io.on('connection', (socket) => {
  console.log('Client connected');
  videoCallSocketHandler(io, socket); 
  chatSocketHandler(io, socket);
});


app.use('/conversation',conversationRoute)
app.use('/users',userRoute)
app.use('/', messageRoute,(req,res)=>{
  console.log(req.url);
  
});
app.use(errorHandler)

const port = 4006
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});