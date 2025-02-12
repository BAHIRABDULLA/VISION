import { RootState } from '@/redux/store/store';
import { Button } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { MessageCircle, Send, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns'


const ChatInterface = ({
  users,
  selectedUser,
  messages,
  newMessage,
  setNewMessage,
  handleUserSelect,
  sendMessage,
  role,
  hasMentorship = false 
}) => {
  const user = useSelector((state: RootState) =>
    state.menteeAuth.user || state.mentorAuth.user
  );
  const groupedMessages: Record<string, typeof messages> = messages.reduce((acc, msg) => {
    const date = format(new Date(msg.timestamp), 'MM/dd/yyyy')
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {} as Record<string, typeof messages>)

  if (!hasMentorship) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="max-w-lg w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  No Active Mentorship Plan
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Get personalized guidance from industry experts by purchasing a mentorship plan.
                </p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2">
                View Mentorship Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Chat Area (Left Side) */}
      <div className="flex flex-col flex-grow">
        {/* Chat Header */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 shadow-sm">
          {selectedUser ? (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-300 text-lg font-semibold">
                  {role === 'mentee'
                    ? selectedUser.mentorId.fullName.charAt(0)
                    : selectedUser.menteeId.fullName.charAt(0)}
                </span>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {role === 'mentee'
                    ? selectedUser.mentorId.fullName
                    : selectedUser.menteeId.fullName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {role === 'mentee' ? 'Your Mentor' : 'Your Mentee'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-4">
              <MessageCircle className="w-6 h-6 text-gray-400 mr-2" />
              <span className="text-gray-500 dark:text-gray-400">
                Select a conversation to start chatting
              </span>
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {selectedUser && (
            <div className="space-y-4">
              {Object.entries(groupedMessages).map(([date, msgs]) => (
                <div key={date}>
                  {/* Date Separator */}
                  <div className="flex justify-center my-2">
                    <span className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full">
                      {format(new Date(date), 'dd MMM yyyy')}
                    </span>
                  </div>

                  {/* Messages */}
                  {msgs.map((msg, index) => (
                    <div
                      key={msg._id || index}
                      className={`flex ${user.id === msg.sender ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg mt-1 p-3 ${user.id === msg.sender
                          ? 'bg-purple-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                          }`}
                      >
                        <p className="text-sm">
                          {msg.text}
                          <span className="ml-3 text-xs text-gray-400">
                            {format(new Date(msg.timestamp), 'hh:mm a')}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!selectedUser}
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage || !selectedUser}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Users Panel (Right Side) */}
      <div className="w-80 border-l dark:border-gray-700 bg-gray-200  dark:bg-gray-800">
        <div className="p-4 border-b  dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {role === 'mentor' ? 'Your Mentees' : 'Your Mentors'}
          </h2>
        </div>
        <div className="overflow-y-auto h-full">
          {users?.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                onClick={() => handleUserSelect(user)}
                className={`p-4 cursor-pointer transition-colors ${selectedUser?._id === user._id
                  ? 'bg-purple-50 dark:bg-purple-900/20 '
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                <div className="flex items-center ">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-300 text-lg font-semibold">
                      {role === 'mentor'
                        ? user.menteeId.fullName.charAt(0)
                        : user.mentorId.fullName.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {role === 'mentor'
                        ? user.menteeId.fullName
                        : user.mentorId.fullName}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No active conversations
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;