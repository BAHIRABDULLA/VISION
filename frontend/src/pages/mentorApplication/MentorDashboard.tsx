import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';

const MentorDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPageContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <div className="flex-1 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-semibold">Welcome to the dashboard</h2>
            <p className="mt-4 text-4xl text-center text-purple-500 font-bold">
              Empower the Next Generation <br /> with Your Expertise
            </p>
          </div>
        );
      case 'Personal Information':
        return <div className="text-white">Personal Information Content</div>;
      case 'Chat':
        return <div className="text-white">Chat Content</div>;
      case 'Video Call':
        return <div className="text-white">Video Call Content</div>;
      case 'Billing History':
        return <div className="text-white">Billing History Content</div>;
      case 'Notification':
        return <div className="text-white">Notification Content</div>;
      case 'Mentees':
        return <div className="text-white">Mentees Content</div>;
      default:
        return <div className="text-white">Page Not Found</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <Dashboard setActivePage={setActivePage} activePage={activePage} />
      <main className="flex-1 p-6 bg-gray-900">
        {renderPageContent()}
      </main>
    </div>
  );
};

export default MentorDashboard;
