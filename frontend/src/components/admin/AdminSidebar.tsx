import React, { useState } from 'react';
import {  FaUsers,FaSignOutAlt} from 'react-icons/fa';
import { MdSpaceDashboard } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { GrResources,GrTransaction  } from "react-icons/gr";

import { logout } from '@/redux/store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SideBarLink from './SideBarLink';

const links = [
  { to: '/admin/dashboard', text: 'Dashboard'  ,icon:<MdSpaceDashboard/> },
  { to: '/admin/users', text: 'Users' ,icon:<FaUsers/> },
  { to: '/admin/courses', text: 'Courses' ,icon:<SiCoursera/> },
  { to: '/admin/resources', text: 'Resources'  ,icon:<GrResources/>},
  { to: '/admin/transaction', text: 'Transaction'  ,icon:<GrTransaction/>},
]

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [activeLink, setActiveLink] = useState('/admin/dashboard')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());  
    navigate('/admin/login');   
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-20 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <h3 className={`text-2xl font-bold text-gray-800 transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>VISION</h3>
        <button
          className={`text-white focus:outline-none absolute right-0 transform py-3 rounded-lg px-2 bg-gray-800 translate-x-2 top-9 -translate-y-1/2`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '>' : '<'}
        </button>
      </div>
      <nav className="mt-10">
        <ul>
          {links.map((link) => (
            <SideBarLink key={link.to} to={link.to} text={link.text} icon={link.icon} isCollapsed={isCollapsed}
              onClick={() => setActiveLink(link.to)}
              isActive={activeLink === link.to} />
          ))}
          <li
            className={`flex items-center p-2 mt-2 cursor-pointer hover:bg-gray-200 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            {!isCollapsed && <span>Logout</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
