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
  console.log(user, 'user in chat ');

  const role = user?.role === 'mentee' ? 'mentee' : 'mentor';
  console.log(role, 'role');


  const [messages, setMessages] = useState<Message[]>([])
  console.log(messages, 'messages');
  const [selectedUser, setSelectedUser] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [users, setUsers] = useState([])
  console.log(users, 's');
  const [isConnected, setIsConnected] = useState(false)
  const userId: string | undefined = user?.id
  console.log(userId, 'userId');

  
  useEffect(() => {
    // Initialize socket connection
    if (!socket && userId) {
      socket = io('http://localhost:4000', {
        withCredentials: true,
        path: '/messages',
        transports: ['websocket', 'polling'],
        auth: { userId } // Send userId in connection auth
      })
    }

    // Socket event handlers
    if (socket) {
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id)
        setIsConnected(true)
        // Emit user_join after successful connection
        socket.emit('user_join', { userId })
      })

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error)
        setIsConnected(false)
        toast.error('Failed to connect to chat server')
      })

      socket.on('private_message', (data) => {
        setMessages((prev) => [...prev, { message: data.message, received: true }])
      })

      // Fetch users on connection
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

    // Cleanup
    return () => {
      if (socket) {
        socket.off('connect')
        socket.off('connect_error')
        socket.off('private_message')
        socket.disconnect()
        socket = null
      }
    }
  }, [userId])

  // const fetchMessages = async (userId: string, participantId: string) => {
  //   try {
  //     // const response = await getMessages(userId, participantId)
  //     // console.log(response, 'response in fetchmessages');

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const sendMessage = () => {
    if (!socket || !isConnected) {
      toast.error('Not connected to chat server')
      return
    }

    if (newMessage && selectedUser) {
      socket.emit('private_message', {
        to: selectedUser._id,
        message: newMessage
      }, (acknowledgement) => {
        // Handle acknowledgement from server
        if (acknowledgement?.error) {
          toast.error('Failed to send message')
          return
        }
        // Only add message to UI if server acknowledged
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
      <div className="flex flex-col w-3/4 bg-green-500">
        {/* Chat Header */}
        <div className="flex items-center justify-between bg-gray-600 p-4 shadow-md">
          {selectedUser ? (
            <div className="flex items-center">
              <div className="mr-4 w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {selectedUser.fullName.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-lg text-white font-semibold">
                  {selectedUser.fullName}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white text-xl font-bold">
              Select a chat to start messaging
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-grow px-4 py-2 space-y-2 bg-gray-700">
          {selectedUser ? (
            <div className="flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[70%] rounded-lg p-1 px-4 ${msg.received
                    ? "bg-white text-black self-start"
                    : "bg-purple-100 text-black self-end"
                    }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              No chat selected
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex items-center p-4 bg-gray-300 border-t ">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-grow p-2 text-black rounded-lg border  focus:outline-none  "
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!selectedUser}
          />
          <button
            className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
            onClick={sendMessage}
            disabled={!newMessage || !selectedUser}
          >
            Send
          </button>
        </div>
      </div>

      {/* Users Panel (Right Side) */}
      <div className="w-1/4 bg-gray-600 border-l border-gray-300 overflow-y-auto">
        <div className="overflow-y-auto">
          {users?.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-500 ${selectedUser?.id === user.id ? "bg-gray-600" : ""
                }`}
              onClick={() => handleUserSelect(user)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {user?.fullName.charAt(0)}
                </span>
              </div>
              <div className="ml-4 text-white flex-grow">{user?.fullName}</div>

            </div>
          ))}
        </div>
      </div>
    </div>



  )
}

export default Chat