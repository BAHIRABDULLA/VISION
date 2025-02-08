import React from 'react';
import { FaUserCircle, FaComments, FaVideo, FaHistory, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { PiBooksFill } from "react-icons/pi";
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { MdSpaceDashboard } from 'react-icons/md';
import { FaCheckToSlot } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as menteeLogout } from '@/redux/slices/menteeAuthSlice';
import { logout as mentorLogout } from '@/redux/slices/mentorAuthSlice';
import { logout } from '@/services/userApi';
import { RootState } from '@/redux/store/store';
import { toggleTheme } from '@/redux/slices/themeSlice';

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  const theme = useSelector((state: RootState) => state.theme.mode)


  const logoutUser = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    role === 'mentee' ? dispatch(menteeLogout()) : dispatch(mentorLogout());

    navigate('/');
  };

  const items = [
    { label: 'Dashboard', icon: <MdSpaceDashboard />, path: '/dashboard' },
    { label: 'Personal Information', icon: <FaUserCircle />, path: '/dashboard/profile' },
    { label: 'Chat', icon: <FaComments />, badge: '5', path: '/dashboard/chat' },
    { label: 'Video Call', icon: <FaVideo />, badge: '5', path: '/dashboard/video-call-users' },
    { label: 'Billing History', icon: <FaHistory />, path: '/dashboard/billing' },
    { label: 'My Courses', icon: <PiBooksFill />, path: '/dashboard/user-courses' },
    ...(role === 'mentor' ?[{ label: 'Slot Management', icon: <FaCheckToSlot />, path: '/dashboard/slot-manage' }]:[]),
    { label: 'Log out', icon: <FaSignOutAlt />, onClick: logoutUser },
    { label: theme === 'light' ? 'Dark Mode' : 'Light Mode', icon: theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />, onClick: () => dispatch(toggleTheme()) }

  ];

  return (
    <div
      className={`min-h-screen ${isCollapsed ? 'w-20' : 'w-64'} fixed ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'bg-gray-800 text-white'
        } flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className={`text-xl font-semibold tracking-widest ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'
            } ${isCollapsed ? 'hidden' : ''}`}
        >
          VISION
        </Link>
        <button onClick={toggleSidebar} className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          <FaBars />
        </button>
      </div>

      <nav className="flex flex-col flex-grow space-y-2 mt-4">
        {items.map(({ label, icon, path, onClick }) => (
          <Link
            key={label}
            to={path || '#'}
            onClick={onClick ? () => onClick() : undefined}
            className={`w-full flex items-center justify-between p-4 ${location.pathname === path
                ? theme === 'light'
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-600 text-white'
                : theme === 'light'
                  ? 'hover:bg-purple-400 hover:text-white'
                  : 'hover:bg-purple-600'
              } rounded-md transition cursor-pointer relative ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{icon}</div>
              {!isCollapsed && <span>{label}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
