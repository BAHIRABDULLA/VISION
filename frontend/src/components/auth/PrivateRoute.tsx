import { RootState } from '@/redux/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


interface PrivateRouteProps {
  children: React.ReactNode
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  console.log(children,'children in private route');
  
  const isMenteeAuthenticated = useSelector(
    (state: RootState) => state.menteeAuth.isAuthenticated
  )
  const isMentorAuthenticated = useSelector(
    (state: RootState) => state.mentorAuth.isAuthenticated
  )

  if (isMenteeAuthenticated) {
    return <>{children}</>
  }
  
  if (isMentorAuthenticated) {
    console.log(isMentorAuthenticated,'is mentor authenticated in private roiute');
    
    return <>{children}</>
  }
  console.log('blum blum blum ');
  
  return <Navigate to='/' />
}

export default PrivateRoute