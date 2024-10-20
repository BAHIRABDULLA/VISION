import { RootState } from '@/redux/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const AdminPrivateRoute= ({children}:any) => {
  const isAuthenticated= useSelector((state:RootState)=>state.adminAuth.isAuthenticated)
  return isAuthenticated?children:<Navigate to='/admin/login'/>;
}

export default AdminPrivateRoute