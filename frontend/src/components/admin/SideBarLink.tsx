import React from 'react';
import { Link } from 'react-router-dom';

interface SideBarLinkProps {
  to: string;
  text: string;
  icon:React.ReactNode;
  isCollapsed: boolean;
  isActive:boolean
  onClick:()=>void
}

const SideBarLink: React.FC<SideBarLinkProps> = ({ to, text,icon, isCollapsed,isActive ,onClick}) => {
  return (
    <li className={` hover:bg-gray-200  ${isActive?'bg-gray-800':''}` }>
      <Link
        to={to}
        onClick={onClick}
        className={`flex items-center py-4 px-4 ${isActive ? 'text-white' : 'text-gray-800'} text-lg transition-all duration-200`}
      >
        <span className='text-xl mr-4'>{icon}</span>
        {!isCollapsed&&text}
      </Link>
    </li>
  );
};

export default SideBarLink;
