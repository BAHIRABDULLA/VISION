import { useEffect, useState } from 'react'

import { io, Socket } from 'socket.io-client'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { getAllUsers } from '@/services/messageApi';
import toast, { Toaster } from 'react-hot-toast';


type Message = {
  message: string;
  received: boolean;
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


  useEffect(() => {
    if (!socket && userId) {
      socket = io('https://apivision.bahirabdulla.online/messages/chat', {
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

      socket.on('chat-private_message', (data) => {
        setMessages((prev) => [...prev, { message: data.message, received: true }])
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
      
      socket.emit('chat-private_message', {
        to: role === 'mentee' ? selectedUser.mentorId._id : selectedUser.menteeId._id,
        message: newMessage
      }, (acknowledgement) => {
        if (acknowledgement?.error) {
          toast.error('Failed to send message')
          return
        }
        setMessages((prev) => [...prev, { message: newMessage, received: false }])
        setNewMessage('')
      })
    }
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    // fetchMessages(userId, user.id)
  }



  return (
    <div className="flex h-screen">
      <Toaster />
      {/* Chat Area (Left Side) */}
      <div className="flex flex-col w-3/4 dark:bg-gray-800 bg-gray-100">
        {/* Chat Header */}
        <div className="flex items-center justify-between dark:bg-gray-700 bg-gray-300 p-4 shadow-md">
          {selectedUser ? (
            <div className="flex items-center">
              <div className="mr-4 w-10 h-10 rounded-full dark:bg-gray-600 bg-gray-400 flex items-center justify-center">
                <span className="dark:text-white text-black text-xl font-bold">
                  {role === 'mentee'
                    ? selectedUser.mentorId.fullName.charAt(0)
                    : selectedUser.menteeId.fullName.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-lg dark:text-white text-gray-800 font-semibold">
                  {role === 'mentee'
                    ? selectedUser.mentorId.fullName
                    : selectedUser.menteeId.fullName}
                </div>
              </div>
            </div>
          ) : (
            <div className="dark:text-white text-gray-800 text-xl font-bold">
              Select a chat to start messaging
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-grow px-4 py-2 space-y-2 dark:bg-gray-800 bg-gray-100">
          {selectedUser ? (
            <div className="flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[70%] rounded-lg p-1 px-4 ${msg.received
                    ? "dark:bg-gray-700 bg-white dark:text-gray-200 text-black self-start"
                    : "dark:bg-purple-800 bg-purple-100 dark:text-white text-black self-end"
                    }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full dark:text-gray-300 text-gray-700">
              No chat selected
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex items-center p-4 dark:bg-gray-700 bg-gray-300 border-t dark:border-gray-600">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow p-2 dark:text-white text-black dark:bg-gray-600 bg-gray-200 rounded-lg border dark:border-gray-500 focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!selectedUser}
          />
          <button
            className="ml-4 dark:bg-purple-700 bg-purple-600 dark:text-white text-white px-4 py-2 rounded-lg disabled:dark:bg-gray-500 disabled:bg-gray-400"
            onClick={sendMessage}
            disabled={!newMessage || !selectedUser}
          >
            Send
          </button>
        </div>
      </div>

      {/* Users Panel (Right Side) */}
      <div className="w-1/4 dark:bg-gray-800 bg-gray-300 border-l dark:border-gray-700 border-gray-300 overflow-y-auto">
        <div className="overflow-y-auto">
          {users?.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-4 cursor-pointer hover:dark:bg-gray-700 hover:bg-gray-500 ${selectedUser?._id === user._id
                ? "dark:bg-gray-700 bg-gray-600"
                : ""
                }`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="w-10 h-10 rounded-full dark:bg-gray-600 bg-gray-400 flex items-center justify-center">
                <span className="dark:text-white text-black text-xl font-bold">
                  {role === 'mentor'
                    ? user.menteeId.fullName.charAt(0)
                    : user.mentorId.fullName.charAt(0)}
                </span>
              </div>
              <div className="ml-4 dark:text-white text-gray-800 flex-grow">
                {role === 'mentor'
                  ? user.menteeId.fullName
                  : user.mentorId.fullName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Chat