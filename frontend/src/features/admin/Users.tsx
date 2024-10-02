import React from 'react';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  applicationStatus: string;
  status: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Mentor', applicationStatus: 'Approved', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Mentee', applicationStatus: 'Pending', status: 'Inactive' },
];

const Users: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Users List</h2>
      <table className="w-full table-auto bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 text-left">SL No</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Role</th>
            <th className="py-3 px-4 text-left">Application Status</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.role}</td>
              <td className="py-3 px-4">{user.applicationStatus}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 text-sm rounded ${user.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {user.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  View
                </button>
                <button className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
