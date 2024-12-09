import {Server , Socket} from 'socket.io'



const chatSocketHandler = (io:Server,socket:Socket) =>{
    console.log('___________');
    
    socket.on('join_room',(roomId)=>{
        socket.join(roomId)
        console.log(`User ${socket.id} joined room ${roomId}`);
        
    })
    socket.on('send_message',(data)=>{
        console.log('Message received',data);
        io.to(data.roomId).emit('receive_message',data)
        
    })
}

export default chatSocketHandler