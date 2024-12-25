import  { useEffect, useState } from 'react'
import { TextField, Button,  Typography,  List, ListItem, ListItemText, IconButton, Avatar, ListItemAvatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonIcon from '@mui/icons-material/Person';
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000', {
    withCredentials: true,
    path: '/messages',
    transports: ['websocket', 'polling']
})
const Chat = () => {
    const [roomId, setRoomId] = useState('')
    console.log(roomId, 'room id ');

    const [message, setMessage] = useState('')
    console.log(message, 'message ');

    const [messages, setMessages] = useState<string[]>([])
    console.log(messages, 'messages');
    const [selectedUser, setSelectedUser] = useState(null)

    const users = [
        { id: 1, name: 'John Doe', lastMessage: 'Hey there!', online: true },
        { id: 2, name: 'Jane Smith', lastMessage: 'How are you?', online: false },
        { id: 3, name: 'Mike Johnson', lastMessage: 'Meeting at 2', online: true },
        { id: 4, name: 'Emily Brown', lastMessage: 'Call me later', online: false },
    ];
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
        <div className="flex h-screen">
        {/* Users Panel (Left Side) */}
        <div className="w-1/4 bg-gray-600 border-r border-gray-300">
          {/* Room ID Input */}
          <div className="p-4 bg-gray-600 flex items-center justify-between">
            <TextField 
              label="Room ID"
              variant="outlined"
              size="small"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              startIcon={<GroupAddIcon />}
              onClick={joinRoom}
            >
              Join
            </Button>
          </div>
  
          {/* Users List */}
          <List className="overflow-y-auto max-h-[calc(100vh-120px)]">
            {users.map((user) => (
              <ListItem 
                key={user.id} 
                button 
                selected={selectedUser?.id === user.id}
                onClick={() => setSelectedUser(user)}
                className="hover:bg-gray-200 text-white"
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon color={user.online ? 'success' : 'disabled'} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={user.name} 
                  secondary={user.lastMessage} 
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                {user.online && <div className="w-2 h-2 bg-green-500 rounded-full ml-2" />}
              </ListItem>
            ))}
          </List>
        </div>
  
        {/* Chat Area (Right Side) */}
        <div className="flex flex-col w-3/4 bg-green-500">
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-gray-600 p-4 shadow-md">
            {selectedUser ? (
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <PersonIcon />
                </Avatar>
                <div>
                  <Typography variant="h6">{selectedUser.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {selectedUser.online ? 'Online' : 'Offline'}
                  </Typography>
                </div>
              </div>
            ) : (
              <Typography variant="h5" className="text-white">
                Select a chat to start messaging
              </Typography>
            )}
          </div>
  
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto px-4 py-2 space-y-2 bg-gray-700">
            {selectedUser ? (
              <List>
                {messages.map((msg, index) => (
                  <ListItem 
                    key={index} 
                    className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    <ListItemText
                      primary={msg}
                      className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-purple-100'} 
                        rounded-lg p-2 max-w-[70%]
                      `}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                No chat selected
              </div>
            )}
          </div>
  
          {/* Message Input */}
          <div className="flex items-center p-4 bg-gray-400 border-t border-green-500">
            <TextField 
              label="Type a message"
              variant="outlined"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mr-4"
              disabled={!selectedUser}
            />
            <IconButton
              color="secondary"
              onClick={sendMessage}
              disabled={!message || !selectedUser}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    )
}

export default Chat