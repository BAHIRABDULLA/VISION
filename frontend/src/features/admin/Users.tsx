import { getAllUsers } from '@/services/adminApi';
import React, { useEffect, useState } from 'react';


interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  isApproved: boolean;
  isActive: boolean;
}


const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])

  const allUsers = async () => {
    try {
      const response = await getAllUsers()
      console.log(response, 'response in Users in admin side ');
      if (response && Array.isArray(response.data.users)) {
        setUsers(response.data.users)
      } else {
        console.error('Api response is not an array:', response);
        setUsers([])
      }
    } catch (error) {
      console.log('errror during fetching data', error);
      setUsers([])
    }
  }
  useEffect(() => {
    allUsers()

    // console.log(users[users.length-1].isApproved,'users[users.length-1].isApproved');

  }, [])


  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Users List</h2>
      <table className="min-w-full border border-gray-300">
        <thead className='bg-gray-100'>
          <tr >
            <th className="px-4 py-2">SL No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Application Status</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (

            users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.fullName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.isApproved}</td>

                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-sm rounded ${user.isActive == true ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {user.isActive.toString()}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 hover:text-blue-600 hover:no-underline  underline">View</button>
                  <button className="px-3 py-1 hover:text-red-600 hover:no-underline  underline">Delete</button>
                </td>
              </tr>
            ))

          ) : (
            <tr>
              <td colSpan={7} className=' text-center font-semibold px-4 py-2 '>Users not found</td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
};

export default Users;
