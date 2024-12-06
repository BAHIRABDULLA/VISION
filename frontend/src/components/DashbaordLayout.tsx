import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store/store";


const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const role = useSelector((state: RootState) => state.menteeAuth.user?.role === 'mentee' ? 'mentee' : 'mentor')
  console.log(role,'role in dashboard layout ');
  
  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`flex-1 p-6 bg-slate-800 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout