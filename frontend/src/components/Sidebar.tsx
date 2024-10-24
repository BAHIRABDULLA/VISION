import React, { useState } from 'react';
import { FaUserCircle, FaComments, FaVideo, FaHistory, FaBell, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import SidebarItem from './SidebarItem';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as menteeLogout } from '@/redux/slices/menteeAuthSlice';
import { logout as mentorLogout } from '@/redux/slices/mentorAuthSlice';
import { logout} from '@/services/userApi';


interface SidebarProps {
  role: 'mentor' | 'mentee';
  activePage: string;
  setActivePage: (page: string) => void;
  isCollapsed:boolean;
  toggleSidebar:()=>void
}

const Sidebar: React.FC<SidebarProps> = ({ role, activePage, setActivePage,isCollapsed,toggleSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutUser =async () => {
    const apiLogout = await logout()
    if (role == 'mentee') {
      dispatch(menteeLogout())
      navigate('/')

    } else {
      dispatch(mentorLogout())
      navigate('/signin')

    }
    localStorage.removeItem('accessToken')
  } 

  // const [isCollapsed, setIsCollapsed] = useState(false);

  // const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const items = [
    { label: 'Dashboard', icon: <MdSpaceDashboard /> },
    { label: 'Personal Information', icon: <FaUserCircle /> },
    { label: 'Chat', icon: <FaComments />, badge: '5' },
    { label: 'Video Call', icon: <FaVideo />, badge: '5' },
    { label: 'Billing History', icon: <FaHistory /> },
    { label: 'Notification', icon: <FaBell /> },
    ...(role === 'mentor' ? [{ label: 'Mentees', icon: <FaUsers /> }] : [{ label: 'Mentors', icon: <FaUsers /> }]),
    { label: 'Log out', icon: <FaSignOutAlt />, onClick: logoutUser },
  ];

  return (
    <div className={`min-h-screen fixed bg-gray-900 ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300 text-white flex flex-col`}>
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className={`text-xl font-semibold tracking-widest text-purple-400 ${isCollapsed ? 'hidden' : ''}`}>
          VISION
        </h1>
        <button onClick={toggleSidebar} className="text-white">
          <FaBars />
        </button>
      </div>

      <nav className="flex flex-col flex-grow space-y-2 mt-4">
        {items.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            isActive={activePage === item.label}
            badge={item.badge}
            onClick={item.onClick ? item.onClick : () => setActivePage(item.label)}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
