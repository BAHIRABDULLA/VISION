import express from 'express';
import connectMongodb from './config/db.config';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports:['websocket','polling'],
  path:'/messages'
  
});

connectMongodb();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());


import messageRoutes from './routes/messageRoute'
// app.use('/', messageRoutes);

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    io.to(data.roomId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port =  4006;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
