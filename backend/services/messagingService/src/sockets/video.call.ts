import {Server, Namespace, Socket } from 'socket.io'

const videoCallSocketHandler = (namespace: Namespace, socket: Socket) => {
    console.log('Video call socket initialized:', socket.id);

    const rooms = new Map();

    // Handle joining a room
    // socket.on('join-room', (data) => {
    socket.on('video-join-room', ({ bookingId, userId }) => {
        // console.log('join room activated',data);

        socket.join(bookingId);

        if (!rooms.has(bookingId)) {
            rooms.set(bookingId, new Set());
        }
        rooms.get(bookingId).add(userId);

        console.log(`User ${userId} joined room ${bookingId}`);
    });

    // Handle call initiation
    socket.on('video-call-user', ({ offer, bookingId, targetUserId }) => {
        console.log('call user activated',  bookingId, 'booking Id',targetUserId);
        const userId = targetUserId._id
        socket.to(bookingId).emit('video-call-user', {
            offer,
            targetUserId:userId
        });
    });

    // Handle call acceptance
    socket.on('call-accepted', ({ answer, bookingId, targetUserId }) => {
        console.log('call acccepted activated', bookingId,'booking Id', targetUserId);
        const userId = targetUserId._id
        socket.to(bookingId).emit('call-accepted', {
            answer,
            targetUserId : userId
        });
    });

    // Handle ICE candidates
    socket.on('ice-candidate', ({ candidate, bookingId, targetUserId }) => {
        console.log('ice candidate activated', candidate,'candidate', bookingId,'booking Id', targetUserId);
        const userId = targetUserId._id
        socket.to(bookingId).emit('ice-candidate', {
            candidate,
            targetUserId:userId
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        // Clean up rooms
        console.log(rooms, 'rooms in video call socket disconnect');

        rooms.forEach((participants, roomId) => {
            if (participants.has(socket.id)) {
                participants.delete(socket.id);
                if (participants.size === 0) {
                    rooms.delete(roomId);
                }
            }
        });
        console.log('User disconnected:', socket.id);
    });
}

export default videoCallSocketHandler