import React, { useState } from 'react'
import { FaUserCircle, FaComments, FaVideo, FaHistory, FaBell, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';



const Dashboard = () => {

  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleToggleSlidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className={` flex h-screen bg-gray-900  ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
      {/* Sidebar */}
      <div className=" bg-gray-800 text-white flex flex-col items-center py-8 relative">

        <button className='absolute top-4 ring-4 focus:outline-none text-2xl'><FaBars /></button>

          {/* Logo */}
        {!isCollapsed && (
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold tracking-widest text-purple-400">VISION</h1>
          </div>
        )}

      


        {/* Navigation */}
        <nav className="flex flex-col w-full space-y-2">
          <div className="w-full flex items-center justify-between p-4 hover:bg-purple-600 rounded-md transition">
            <div className="flex items-center space-x-3">
              <FaUserCircle className="text-2xl" />
              <span>Dashboard</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-4 hover:bg-purple-600 rounded-md transition">
            <div className="flex items-center space-x-3">
              <FaUserCircle className="text-2xl" />
              <span>Personal Information</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-4 hover:bg-purple-600 rounded-md transition relative">
            <div className="flex items-center space-x-3">
              <FaComments className="text-2xl" />
              <span>Chat</span>
            </div>
            <span className="absolute right-4 bg-pink-500 text-sm text-white px-2 py-1 rounded-full">5</span>
          </div>
          <div className="w-full flex items-center justify-between p-4 hover:bg-purple-600 rounded-md transition relative">
            <div className="flex items-center space-x-3">
              <FaVideo className="text-2xl" />
              <span>Video Call</span>
            </div>
            <span className="absolute right-4 bg-pink-500 text-sm text-white px-2 py-1 rounded-full">5</span>
          </div>
          <div className="w-full flex items-center justify-between p-4 hover:bg-purple-600 rounded-md transition">
            <div className="flex items-center space-x-3">
              <FaHistory className="text-2xl" />
              <span>Billing History</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-4 hover:bg-purple-600 rounded-md transition">
            <div className="flex items-center space-x-3">
              <FaBell className="text-2xl" />
              <span>Notification</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-4 hover:bg-purple-600 rounded-md transition">
            <div className="flex items-center space-x-3">
              <FaUsers className="text-2xl" />
              <span>Mentees</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-4 hover:bg-purple-600 rounded-md transition">
            <div className="flex items-center space-x-3">
              <FaSignOutAlt className="text-2xl" />
              <span>Log out</span>
            </div>
          </div>
        </nav>
      </div>


    </div>
  )
}

export default Dashboard