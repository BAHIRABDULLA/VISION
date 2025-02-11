import { useEffect, useState } from 'react'

import { io, Socket } from 'socket.io-client'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { getAllUsers, getChatHistory } from '@/services/messageApi';
import toast, { Toaster } from 'react-hot-toast';
import ChatInterface from './ChatInterface';


type Message = {
  text?: string;
  sender?: string;
  timestamp?: string;
  
};

let socket: Socket | null = null

const Chat = () => {
  const user = useSelector((state: RootState) =>
    state.menteeAuth.user || state.mentorAuth.user
  );

  const role = user?.role === 'mentee' ? 'mentee' : 'mentor';


  const [messages, setMessages] = useState<Message[]>([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [users, setUsers] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const userId: string | undefined = user?.id


  const fetchMessages = async (userId,selectedUserId) => {
    try {
      const response = await getChatHistory(userId, selectedUserId)      
      if (response?.status >= 400) {
        toast.error(response.data.message || 'Failed to fetch users')
      } else {
        setMessages(response?.data.messages || [])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to fetch users')
    }
  }

  useEffect(() => {
    if (!socket && userId) {
      socket = io('http://localhost:4000/messages/chat', {
        withCredentials: true,
        // path: '',
        transports: ['websocket', 'polling'],
        auth: { userId }
      });
    }

    if (socket) {
      socket.on('connect', () => {
        setIsConnected(true)

        socket.emit('chat-user_join', { userId })
      })

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error)
        setIsConnected(false)
        toast.error('Failed to connect to chat server')
      })

      // socket.on('chat-private_message', (data) => {
      //   setMessages((prev) => [...prev, { message: data.message, received: true }])
      // })
      socket.on('chat-private_message', (data) => {
        setMessages((prev) => [...prev, {
          text: data.message,
          sender: data.sender,
          timestamp: data.timestamp,
          _id:Math.random().toString(36).substr(2, 9)
        }])
      })


      const fetchUsers = async () => {
        try {
          const response = await getAllUsers(userId)

          if (response?.status >= 400) {
            toast.error(response.data.message || 'Failed to fetch users')
          } else {
            setUsers(response?.data.users || [])
          }
        } catch (error) {
          console.error('Error fetching users:', error)
          toast.error('Failed to fetch users')
        }
      }

      fetchUsers()
    }


    return () => {
      if (socket) {
        socket.off('connect')
        socket.off('connect_error')
        socket.off('chat-private_message')
        socket.disconnect()
        socket = null
      }
    }
  }, [userId])


  const sendMessage = () => {

    if (!socket || !isConnected) {
      toast.error('Not connected to chat server')
      return
    }

    if (newMessage && selectedUser) {
      const recipientId = role === 'mentee' ? selectedUser.mentorId._id : selectedUser.menteeId._id

      socket.emit('chat-private_message', {
        to: recipientId,
        message: newMessage
      }, (acknowledgement) => {
        if (acknowledgement?.error) {
          toast.error('Failed to send message')
          return
        }
        const newMsg ={
          sender:userId,
          text:newMessage,
          timestamp: new Date().toISOString(),
          _id:Math.random().toString(36).substr(2, 9)
        }
        setMessages((prev) => [...prev, newMsg])
        setNewMessage('')
      })
    }
  }

  const handleUserSelect = (user) => {
    
    setSelectedUser(user)
    const recipientId = role === 'mentee' ? selectedUser.mentorId._id : selectedUser.menteeId._id
    
    fetchMessages(userId, recipientId)
    // fetchMessages(userId, user.id)
  }



  return (
    <div className="">
      <Toaster />
      {/* Chat Area (Left Side) */}
      <ChatInterface
        users={users}
        selectedUser={selectedUser}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleUserSelect={handleUserSelect}
        sendMessage={sendMessage}
        role={role}
        hasMentorship={true}
      />
    </div>

  )
}

export default Chat