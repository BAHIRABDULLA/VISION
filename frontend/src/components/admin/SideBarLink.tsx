import React from 'react';
import { Link } from 'react-router-dom';

interface SideBarLinkProps {
  to: string;
  text: string;
  isCollapsed: boolean;
  isActive:boolean
  onClick:()=>void
}

const SideBarLink: React.FC<SideBarLinkProps> = ({ to, text, isCollapsed,isActive ,onClick}) => {
  return (
    <li className={` hover:bg-gray-200  ${isActive?'bg-gray-800':''}` }>
      <Link
        to={to} onClick={onClick}
        className={`block py-4 px-4 ${isActive?'text-white':'text-gray-800'} text-lg transition-all duration-200 ${isCollapsed ? 'text-center' : ''}`}
      >
        {isCollapsed ? text[0] : text} {/* Show only the first letter when collapsed */}
      </Link>
    </li>
  );
};

export default SideBarLink;
