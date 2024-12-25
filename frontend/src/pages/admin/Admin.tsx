import  { useState } from 'react'
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminNavbar from '@/components/admin/AdminNavbar';

const Dashboard = () => {
  const [isSidebarCollapsed,setIsSidebarCollapsed] = useState(false)
  return (
    <div className="flex ">
    <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
    <div className={`flex-grow min-h-screen bg-gray-100  transition-all duration-300 
      ${isSidebarCollapsed ? 'ml-16' : 'ml-72'}`}>
        
      <AdminNavbar  isCollapsed={isSidebarCollapsed} />
      <div className="pt-20 p-8 min-h-screen">
       
        <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Dashboard