import { RootState } from '@/redux/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const MentorPrivateRoute= ({children}:any) => {
   console.log('its here bro btro bro bro ');
   
  const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
  return isAuthenticated?children:<Navigate to='/mentor/dashboard'/>;
}

export default MentorPrivateRoute