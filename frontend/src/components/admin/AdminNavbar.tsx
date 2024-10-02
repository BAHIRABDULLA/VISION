import React from 'react';

const AdminNavbar: React.FC = () => {
  return (
    <nav className="bg-zinc-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">Admin Dashboard</h1>
      <div>
        
        <button className="py-2 px-4 bg-gray-600 rounded">Profile</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
