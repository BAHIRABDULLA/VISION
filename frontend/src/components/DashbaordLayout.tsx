import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import Profile from '@/features/user/dashboard/Profile';

interface DashboardLayoutProps {
  role: 'mentor' | 'mentee';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };


  const [activePage, setActivePage] = useState('Dashboard');
  let user
  if (role == 'mentee') {
    user = useSelector((state: RootState) => state.menteeAuth.user)
  } else {
    user = useSelector((state: RootState) => state.mentorAuth.user)
  }

  console.log(user, 'users');

  const renderPageContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <div className="flex-1 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-semibold">Welcome to the {role} dashboard</h2>
            <p className="mt-4 text-4xl text-center text-purple-500 font-bold">
              {role === 'mentor' ? 'Empower the Next Generation' : 'Gain Insights from Experts'}
            </p>
          </div>
        );
      case 'Personal Information':
        return (
          <Profile role={role}/>
        );
      case 'Chat':
        return <div className="text-white">Chat Content</div>;
      case 'Video Call':
        return <div className="text-white">Video Call Content</div>;
      case 'Billing History':
        return <div className="text-white">Billing History Content</div>;
      case 'Notification':
        return <div className="text-white">Notification Content</div>;
      case 'Mentees':
      case 'Mentors':
        return <div className="text-white">{role === 'mentor' ? 'Mentees' : 'Mentors'} Content</div>;
      default:
        return <div className="text-white">Page Not Found</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} activePage={activePage} setActivePage={setActivePage}
      isCollapsed={isCollapsed}  toggleSidebar={toggleSidebar} />
      <main className={`flex-1 p-6 bg-gray-900 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {renderPageContent()}
      </main>
    </div>
  );
};

export default DashboardLayout;
