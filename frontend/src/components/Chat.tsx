import React, { useEffect, useState } from 'react'
import { TextField, Button, Box, Typography, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000',{
    withCredentials:true,
    path:'/messages',
    transports:['websocket','polling']
})
const Chat = () => {
    const [roomId, setRoomId] = useState('')
    console.log(roomId,'room id ');
    
    const [message, setMessage] = useState('')
    console.log(message,'message ');
    
    const [messages, setMessages] = useState<string[]>([])
    console.log(messages,'messages');
    

    useEffect(() => {
        socket.on('connect_error', (error) => {
            console.error('Detailed Socket Connection Error:', error);
            // console.log('Error name:', error.name);
            // console.log('Error message:', error.message);
            // console.log('Error stack:', error.stack);
        });

        socket.on('connect', () => {
            console.log('Socket successfully connected');
        });
    
        socket.on('receive_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });
    
        socket.on('disconnect', (reason) => {
            console.log('Disconnected:', reason);
        });
    
        return () => {
            socket.off('connect_error');
            socket.off('receive_message');
            socket.off('disconnect');
        }
    }, []);

    const joinRoom = () => {
        if (roomId) {
            socket.emit('join_room', roomId)
        }
    }

    const sendMessage = () => {
        if (message && roomId) {
            const data = { roomId, message }
            socket.emit('send_message', data)
            setMessages((prevMessages) => [...prevMessages, message])
            setMessage('')
        }
    }
    return (
        <div className="flex flex-col h-screen bg-gray-300  rou">
            <div className="flex items-center justify-between bg-gray-200 p-4 shadow-md">
                <Typography variant="h5" className="font-bold text-purple-500">Chat</Typography>
            </div>

            {/* Room ID Input (Top) */}
            <div className="flex justify-center gap-4 bg-gray-600 p-4">
                <TextField sx={{ backgroundColor: "white", borderRadius: "8px", }}
                    label="Room ID"
                    variant="filled"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-72"
                />
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<GroupAddIcon />}
                    onClick={joinRoom}
                >
                    Join Room
                </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2 bg-gray-600">
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index} className="flex justify-between">
                            <ListItemText
                                primary={msg}
                                className={`bg-green-100 rounded-lg p-2 max-w-[70%] ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>

            {/* Message Input (Bottom) */}
            <div className="flex items-center p-4 bg-gray-600 border-t border-gray-200">
                <TextField sx={{ backgroundColor: "white", borderRadius: "8px", }}
                    label="Type a message"
                    variant="filled"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow mr-4"
                />
                <IconButton
                    color="secondary"
                    onClick={sendMessage}
                    disabled={!message}
                >
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat