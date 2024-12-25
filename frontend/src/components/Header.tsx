import React from 'react'
import vision_logo from '../assets/auth/vision_logo.svg'
import vision_logo_dark from '@/assets/auth/vison_logo_black.svg'
import { Link, NavLink } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { IconButton } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { AppDispatch, RootState } from '@/redux/store/store'
import { toggleTheme } from '@/redux/slices/themeSlice'



const Header: React.FC = () => {
  // const role = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isAuthenticated = useSelector((state: RootState) => state.menteeAuth.isAuthenticated)

  const theme  = useSelector((state:RootState)=>state.theme.mode)
  // const handleLogout = () => {
  //   dispatch(menteeLogout())
  // }
  return (
    <header className='flex items-center justify-between px-4 md:px-10 py-6 max-w-7xl mx-auto'>
      {/* Logo container */}
      <div className='flex-shrink-0'>
        <img  
           src={theme==='dark'? vision_logo:vision_logo_dark} 
          alt="vision_logo" 
          className='w-48 md:w-56 ' 
        />
      </div>

      {/* Navigation items */}
      <nav className='hidden md:flex items-center space-x-12'>
        <IconButton onClick={()=>dispatch(toggleTheme())}
          color='primary' aria-label='Toggle Theme'>
          {theme ==='light' ?<DarkModeIcon/> : <LightModeIcon/>}
        </IconButton>
        <Link 
          to='/' 
          className="text-lg hover:text-purple-400 font-medium transition-colors"
        >
          Home
        </Link>
        <Link 
          to='/courses' 
          className=" text-lg hover:text-purple-400 font-medium transition-colors"
        >
          Courses
        </Link>
        <Link 
          to='/mentors' 
          className=" text-lg hover:text-purple-400 font-medium transition-colors"
        >
          Mentors
        </Link>
        {isAuthenticated ? (
          <NavLink 
            to='/dashboard' 
            className=" text-lg hover:text-purple-400 font-medium transition-colors"
          >
            Dashboard
          </NavLink>
        ) : (
          <NavLink 
            to='/signin' 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium"
          >
            Sign In
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header