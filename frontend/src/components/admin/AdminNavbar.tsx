import React from 'react';

const AdminNavbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md text-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div>
        <button className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300">Profile</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
