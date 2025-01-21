import React, { useState } from 'react'
import vision_logo from '../assets/auth/vision_logo.svg'
import vision_logo_dark from '@/assets/auth/vison_logo_black.svg'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { RootState } from '@/redux/store/store'
import { toggleTheme } from '@/redux/slices/themeSlice'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Header: React.FC = () => {
  // const role = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isAuthenticated = useSelector((state: RootState) => state.menteeAuth.isAuthenticated)
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.mode)
  // const handleLogout = () => {
  //   dispatch(menteeLogout())
  // }
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      {/* Main Header*/}
      <header className="">
        <div className="flex items-center justify-between px-4 md:px-10 py-6 max-w-7xl mx-auto">
          {/* Logo container */}
          <div className="flex-shrink-0">
            <img
              src={theme === 'dark' ? vision_logo : vision_logo_dark}
              alt="vision_logo"
              className="w-48 md:w-56"
            />
          </div>

          {/* Navigation items for large screens */}
          <nav className="hidden md:flex items-center space-x-12">
            <IconButton onClick={() => dispatch(toggleTheme())} color="primary" aria-label="Toggle Theme">
              {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Link to="/" className="text-lg hover:text-purple-400 font-medium transition-colors">Home</Link>
            <Link to="/courses" className="text-lg hover:text-purple-400 font-medium transition-colors">Courses</Link>
            <Link to="/mentors" className="text-lg hover:text-purple-400 font-medium transition-colors">Mentors</Link>
            {isAuthenticated ? (
              <NavLink to="/dashboard" className="text-lg hover:text-purple-400 font-medium transition-colors">Dashboard</NavLink>
            ) : (
              <NavLink to="/signin" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium">Sign In</NavLink>
            )}
          </nav>

          <div className='md:hidden '>
            <IconButton
              onClick={toggleDrawer}
              className="md:hidden dark:text-white"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          </div>

        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={toggleDrawer}
      >
        <div
          className={`fixed top-0 left-0 w-3/4 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          // onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <img
              src={theme === 'dark' ? vision_logo : vision_logo_dark}
              alt="vision_logo"
              className="w-36"
            />
            <IconButton onClick={toggleDrawer} aria-label="Close Menu">
              <CloseIcon className="dark:text-white" />
            </IconButton>
          </div>
          <nav className="flex flex-col space-y-4 p-4">
            <IconButton
              onClick={() => {
                dispatch(toggleTheme());
                toggleDrawer();
              }}
              color="primary"
              aria-label="Toggle Theme"
              className="self-start"
            >
              {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Link to="/" className="text-lg font-medium transition-colors hover:text-purple-400" onClick={toggleDrawer}>Home</Link>
            <Link to="/courses" className="text-lg font-medium transition-colors hover:text-purple-400" onClick={toggleDrawer}>Courses</Link>
            <Link to="/mentors" className="text-lg font-medium transition-colors hover:text-purple-400" onClick={toggleDrawer}>Mentors</Link>
            {isAuthenticated ? (
              <NavLink to="/dashboard" className="text-lg font-medium transition-colors hover:text-purple-400" onClick={toggleDrawer}>Dashboard</NavLink>
            ) : (
              <NavLink to="/signin" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium text-center" onClick={toggleDrawer}>Sign In</NavLink>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header