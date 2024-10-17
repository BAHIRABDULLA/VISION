import React from 'react';


interface AdminNavbarProps {
  isCollapsed: boolean;
}
const AdminNavbar: React.FC<AdminNavbarProps> = ({ isCollapsed }) => {
  return (
    <nav
      className={`bg-white shadow-md text-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        isCollapsed ? 'ml-16' : 'ml-72'
      }`}
    >
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      
    </nav>
  );
};

export default AdminNavbar;
