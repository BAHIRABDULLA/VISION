import React from 'react'
import vision_logo from '../assets/auth/vision_logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/redux/store/authSlice'
import { RootState } from '@/redux/store/store'



const Header: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <header className='flex  justify-center items-center px-10 py-4'>
      <div className=''>
        <img src={vision_logo} alt="vision_logo" className='w-32 h-14 object-cover' />
      </div>
      <nav className=''>
        <Link to='' className="text-white hover:text-purple-400   font-medium mx-9">Home</Link>
        <Link to='' className="text-white hover:text-purple-400  font-medium mx-9">Resources</Link>
        <NavLink to='/courses' className="text-white hover:text-purple-400  font-medium mx-9">Community</NavLink>
        {isAuthenticated ? (
          <NavLink to='/profile' className="text-white hover:text-purple-400 font-medium mx-9">
            Profile
          </NavLink>
        ) : (<NavLink to='/signin' className="text-white
         hover:text-purple-400  font-medium mx-9">Sign In</NavLink>)}
      </nav>
    </header>
  )
}

export default Header