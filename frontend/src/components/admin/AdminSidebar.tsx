import React, { useState } from 'react';
import SideBarLink from './SideBarLink';

const links = [
  { to: '/admin/dashboard', text: 'Dashboard' },
  { to: '/admin/users', text: 'Users' },
  { to: '/admin/courses', text: 'Courses' },
  { to: '/admin/resources', text: 'Resources' },
  { to: '/admin/transaction', text: 'Transaction' },
]

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [activeLink, setActiveLink] = useState('/admin/dashboard')
  return (
    <div className={`h-full bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-72'}`}>
      <div className="flex justify-between items-center p-4">
        <h3 className={`text-2xl font-bold text-gray-800 transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>VISION</h3>
        <button
          className="text-gray-500 focus:outline-none"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '>' : '<'}
        </button>
      </div>
      <nav className="mt-10">
        <ul>
          {links.map((link) => (
            <SideBarLink key={link.to} to={link.to} text={link.text} isCollapsed={isCollapsed}
              onClick={() => setActiveLink(link.to)}
              isActive={activeLink === link.to} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
