import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

import cors from 'cors';
import messageRoutes from './routes/messageRoute'
import connectMongodb from './config/db.config';
import chatSocketHandler from './sockets/chat';
import videoCallSocketHandler from './sockets/video.call';
import { rabbitmqConnect } from './config/rabbitmq';
import { setupConsumer } from './events/rabbitmq/consumers/users.consumer';

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
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use('/', messageRoutes);


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  path: '/messages'

});


io.on('connection', (socket) => {
  console.log('Client connected');

  chatSocketHandler(io, socket);
  videoCallSocketHandler(io, socket);

 
});



const port = 4006
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});