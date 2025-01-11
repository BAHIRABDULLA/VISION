import { Server } from "socket.io";
import { createServer } from "http";

export const httpServer = createServer();
export const io = new Server(httpServer, {
    cors: {
        origin: 'https://vision.bahirabdulla.online',
        methods: ['GET', 'POST'],
        credentials: true
    },
});
const messageNamespace = io.of('/messages');
messageNamespace.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('send_message', (data) => {
        console.log('Message received:', data);
        messageNamespace.to(data.roomId).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


