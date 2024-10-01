// import SidebarItem from '@/interfaces/SidebarItem';
import { SidebarItemProps } from '@/interfaces/SidebarItem';
import React, { useState } from 'react'
import { FaUserCircle, FaComments, FaVideo, FaHistory, FaBell, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { MdSpaceDashboard } from "react-icons/md";

import { useNavigate } from 'react-router-dom';




const Dashboard = ({ setActivePage,activePage }: { setActivePage: (page: string) => void ;activePage:string}) => {

  const [isCollapsed, setIsCollapsed] = useState(false)
  // const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={`h-screen bg-gray-900 ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300
     text-white flex flex-col md:block `}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className={`text-xl font-semibold tracking-widest text-purple-400 ${isCollapsed ? 'hidden' : ''}`}>
          VISION
        </h1>
        <button onClick={toggleSidebar} className="text-white">
          <FaBars />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col flex-grow space-y-2 mt-4">
        <SidebarItem
          icon={<MdSpaceDashboard />}
          label="Dashboard"
          isCollapsed={isCollapsed}
          isActive={activePage==='Dashboard'}
          onClick={() => setActivePage('Dashboard')}
        />
        <SidebarItem
          icon={<FaUserCircle />}
          label="Personal Information"
          isCollapsed={isCollapsed}
          isActive={activePage==='Personal Information'}
          onClick={() => setActivePage('Personal Information')}
        />
        <SidebarItem
          icon={<FaComments />}
          label="Chat"
          badge="5"
          isCollapsed={isCollapsed}
          isActive={activePage==='Chat'}
          onClick={() => setActivePage('Chat')}
        />
        <SidebarItem
          icon={<FaVideo />}
          label="Video Call"
          badge="5"
          isCollapsed={isCollapsed}
          isActive={activePage==='Video Call'}
          onClick={() => setActivePage('Video Call')}
        />
        <SidebarItem
          icon={<FaHistory />}
          label="Billing History"
          isCollapsed={isCollapsed}
          isActive={activePage==='Billing History'}
          onClick={() => setActivePage('Billing History')}
        />
        <SidebarItem
          icon={<FaBell />}
          label="Notification"
          isCollapsed={isCollapsed}
          isActive={activePage==='Notification'}
          onClick={() => setActivePage('Notification')}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Mentees"
          isCollapsed={isCollapsed}
          isActive={activePage==='Mentees'}
          onClick={() => setActivePage('Mentees')}
        />
        <SidebarItem
          icon={<FaSignOutAlt />}
          label="Log out"
          isCollapsed={isCollapsed}
          isActive={activePage==='Log out'}
          onClick={() => setActivePage('Log out')}
        />
      </nav>
    </div>
  )
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isCollapsed,isActive, onClick, badge }: SidebarItemProps) => {
  return (
    <div className={`w-full flex items-center justify-between p-4 ${isActive ?'bg-purple-600':'hover:bg-purple-600'}  rounded-md
    transition cursor-pointer relative`} onClick={onClick}>
      <div className='flex items-center space-x-3'>
        <div className='text-2xl'>{icon}</div>
        {!isCollapsed && <span>{label}</span>}
      </div>
      {badge && !isCollapsed && (
        <span className='absolute right-4 bg-pink-500 text-white px-2 py-1 rounded-full'>{badge}</span>
      )}
    </div>
  )

}


export default Dashboard