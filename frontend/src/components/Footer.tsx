import React from 'react'
import vision_logo from '@/assets/auth/vision_logo.svg'
import vision_logo_dark from '@/assets/auth/vison_logo_black_png.png'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'

const Footer: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.mode)

  return (
    <footer className="py-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white text-center">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
        {/* Logo Section */}
        <div>
          <img src={theme === 'dark' ? vision_logo : vision_logo_dark} alt="Vision Logo" className="h-28 mx-auto lg:mx-0" />
        </div>

        {/* Contact and Links Section */}
        <div className="text-center lg:text-right">
          <p>
            Contact: <a href="mailto:vision@gmail.com" className="hover:underline hover:text-purple-400">vision@gmail.com</a> |
            Address: 123 Vision St, Ernakulam
          </p>
          <div className="mt-4 flex justify-center lg:justify-end space-x-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer