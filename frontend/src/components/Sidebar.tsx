import React from 'react';
import { FaUserCircle, FaComments, FaVideo, FaHistory, FaBell, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaCheckToSlot } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as menteeLogout } from '@/redux/slices/menteeAuthSlice';
import { logout as mentorLogout } from '@/redux/slices/mentorAuthSlice';
import { logout } from '@/services/userApi';

interface SidebarProps {
  role: 'mentor' | 'mentee';
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isCollapsed, setIsCollapsed }) => {
  // const [isCollapsed, setIsCollapsed] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(role,'role in side bar ');
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const logoutUser = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    role === 'mentee' ? dispatch(menteeLogout()) : dispatch(mentorLogout());
    console.log('wait in logouit user in sidebar');
    
    navigate('/');
  };

  const items = [
    { label: 'Dashboard', icon: <MdSpaceDashboard />, path: '/dashboard' },
    { label: 'Personal Information', icon: <FaUserCircle />, path: '/dashboard/profile' },
    { label: 'Chat', icon: <FaComments />, badge: '5', path: '/dashboard/chat' },
    { label: 'Video Call', icon: <FaVideo />, badge: '5', path: '/dashboard/video-call' },
    { label: 'Billing History', icon: <FaHistory />, path: '/dashboard/billing' },
    { label: 'Notification', icon: <FaBell />, path: '/dashboard/notification' },
    ...(role === 'mentor' ?
      [
        { label: 'Mentors', icon: <FaUsers />, path: '/dashboard/mentors' },
        { label: 'Slot Management', icon: <FaCheckToSlot />, path: '/dashboard/slot-manage' }
      ]
      : [{ label: 'Mentees', icon: <FaUsers />, path: '/dashboard/mentees' }]),
    { label: 'Log out', icon: <FaSignOutAlt />, onClick: logoutUser },
  ];

  return (
    <div className={`min-h-screen ${isCollapsed ? 'w-20' : 'w-64'}  fixed bg-gray-700  text-white flex flex-col transition-all duration-300`}>
      <div className="flex items-center justify-between p-4">
        <Link to="/" className={`text-xl  font-semibold tracking-widest text-purple-400 ${isCollapsed ? 'hidden' : ''}`}>VISION</Link>
        <button onClick={toggleSidebar} className="text-white">
          <FaBars />
        </button>
      </div>

      <nav className="flex flex-col flex-grow space-y-2 mt-4">
        {items.map(({ label, icon, path, onClick, badge }) => (
          <Link
            key={label}
            to={path || '#'}
            onClick={onClick ? () => onClick() : undefined}
            className={`w-full flex items-center justify-between p-4
         ${location.pathname === path ? 'bg-purple-600' : 'hover:bg-purple-600'} 
         rounded-md transition cursor-pointer relative ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{icon}</div>
              {!isCollapsed && <span>{label}</span>}
            </div>
            {badge && <span className="absolute right-4 bg-pink-500 text-white px-2 py-1 rounded-full">{badge}</span>}
          </Link>
        ))}
      </nav>

    </div>
  );
};

export default Sidebar;
