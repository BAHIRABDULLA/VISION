import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PrivateRoute= ({children}:any) => {
  const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
  return isAuthenticated?children:<Navigate to='/'/>;
}

export default PrivateRoute