import { getAllUsers } from '@/services/adminApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LuView } from "react-icons/lu";
// import Search from '@/components/Search';



interface User {
  mentor: string;
  _id: string;
  fullName: string;
  email: string;
  role: string;
  isApproved: boolean;
  isActive: boolean;
  createAt: Date
}


const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  console.log(users, 'users');

  // const [searchQuery, setSearchQuery] = useState('');

  const allUsers = async () => {
    try {
      const response = await getAllUsers()
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
  }, [])


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Users List</h2>
        {/* <Search placeholder="Search for users" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /> */}
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden">

        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-16 py-3 px-5 text-left uppercase tracking-wider">SL No</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Name</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Email</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Role</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Application Status</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Status</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users
                .sort((a, b) => {
                  const dateA = new Date(a.createAt).getTime() || 0;
                  const dateB = new Date(b.createAt).getTime() || 0;
                  return dateB - dateA;

                })
                .map((user, index) => (
                  <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="py-3 px-5 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-5 text-gray-700">{user.fullName}</td>
                    <td className="py-3 px-5 text-gray-700">{user.email}</td>
                    <td className="py-3 px-5 text-gray-700">{user.role}</td>
                    {/* <td className="py-3 px-5 text-gray-700">{user.isApproved ? 'Approved' : 'Pending'}</td> */}
                    <td className="py-3 px-5 text-gray-700">{user.role === 'mentor' ? user.isApproved : ''}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`px-3 py-1 inline-block text-sm rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-9">
                      <Link to={`/admin/users/${user.role}-${user._id}`} className="text-blue-500 hover:text-blue-700">
                        <LuView className='w-6 h-6' />
                      </Link>
                      {/* {
                      user.role === 'mentor' ? (<Link to={`/admin/users/${user.role}-${user.mentor}`} className="text-blue-500 hover:text-blue-700">
                        <LuView className='w-6 h-6' /></Link>)
                        :
                        (<Link to={`/admin/users/${user.role}-${user._id}`} className="text-blue-500 hover:text-blue-700">
                          <LuView className='w-6 h-6' />
                        </Link>)
                    } */}


                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center font-semibold text-gray-500">
                  Users not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>

  );
};

export default Users;
