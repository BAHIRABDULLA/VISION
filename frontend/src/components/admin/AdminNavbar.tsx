import { IconButton } from '@mui/material';
import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { RootState } from '@/redux/store/store'
import { toggleTheme } from '@/redux/slices/themeSlice'
import { useDispatch, useSelector } from 'react-redux';


interface AdminNavbarProps {
  isCollapsed: boolean;
}
const AdminNavbar: React.FC<AdminNavbarProps> = ({ isCollapsed }) => {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.theme.mode)
  return (
    <nav
      className={` shadow-md text-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-72'
        }`}
    >
      <div className='flex gap-7'>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <IconButton onClick={() => dispatch(toggleTheme())} color="primary" aria-label="Toggle Theme">
          {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </div>

    </nav>
  );
};

export default AdminNavbar;
