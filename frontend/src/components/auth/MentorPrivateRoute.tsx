import { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const MentorPrivateRoute = ({ children }: any) => {
  const isAuthenticated = useSelector((state: RootState) => state.mentorAuth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to='/signin' />;
}

export default MentorPrivateRoute