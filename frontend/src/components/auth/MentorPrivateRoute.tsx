import { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const MentorPrivateRoute= ({children}:any) => {
   console.log('its here bro btro bro bro ');
   
  const isAuthenticated = useSelector((state:RootState)=>state.mentorAuth.isAuthenticated)
  return isAuthenticated?children:<Navigate to='/signin'/>;
}

export default MentorPrivateRoute