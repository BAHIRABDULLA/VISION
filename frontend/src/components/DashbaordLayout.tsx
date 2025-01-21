import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store/store";


const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = useSelector((state: RootState) => state.menteeAuth.user?.role === 'mentee' ? 'mentee' : 'mentor')

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role={role} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 bg-gray-200 dark:bg-gray-800  ${isCollapsed ? 'ml-20' : 'ml-64'}`} >
        <Outlet />
      </main>
    </div>

  )
}

export default DashboardLayout