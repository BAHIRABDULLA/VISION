import {Server,Socket} from 'socket.io'

const videoCallSocketHandler = (io:Server,socket:Socket) =>{
    console.log('dfkjdkfdsfjdksfkdsfj');
    
    socket.on('offer',(data)=>{
        console.log('offer recieved:',data);
        socket.to(data.roomId).emit('offer',data)
    })

    socket.on('answer',(data)=>{
        console.log('Answer received',data);
        socket.to(data.roomId).emit('answer',data)
        
    })

    socket.on('candidate',(data)=>{
        console.log('Candidate received:',data);
        socket.to(data.roomId).emit('candidate',data)
    })
}

export default videoCallSocketHandler