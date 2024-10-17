import { RootState } from '@/redux/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PrivateRoute= ({children}:any) => {
  console.log( 'its not no tnot not not not ');
  
  const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
  return isAuthenticated?children:<Navigate to='/'/>;
}

export default PrivateRoute