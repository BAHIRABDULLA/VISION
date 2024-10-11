import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminNavbar from '@/components/admin/AdminNavbar';

const Dashboard = () => {
  const [isSidebarCollapsed,setIsSidebarCollapsed] = useState(false)
  return (
    <div className="flex h-screen bg-gray-100">
    <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
    <div className={`flex-1  transition-all duration-300 `}>
      <AdminNavbar />
      <div className="p-6 bg-white h-full shadow-lg">
       
        <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Dashboard