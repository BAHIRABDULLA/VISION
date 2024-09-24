import React from 'react'
import vision_logo from '../assets/auth/vision_logo.svg'
import { Link,NavLink } from 'react-router-dom'



const Header: React.FC = () => {
  return (
    <header className='flex  justify-center items-center px-10 py-4'>
      <div className=''>
        <img src={vision_logo} alt="vision_logo" className='w-32 h-14 object-cover' />
      </div>
      <nav className=''>
        <Link to=''  className="text-white hover:text-purple-400   font-medium mx-9">Home</Link>
        <Link to='' className="text-white hover:text-purple-400  font-medium mx-9">Resources</Link>
        <NavLink to='/courses' className="text-white hover:text-purple-400  font-medium mx-9">Community</NavLink>
        <NavLink to='/signin'  className="text-white hover:text-purple-400  font-medium mx-9">Sign In</NavLink>
      </nav>
    </header>
  )
}

export default Header