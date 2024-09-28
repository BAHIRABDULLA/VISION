import React from 'react'
import vision_logo from '@/assets/auth/vision_logo.svg'

const Footer: React.FC = () => {
  return (
    <footer className='py-10 text-white bg-gray-900 text-center'>
      <div className='container mx-auto flex justify-between items-center'>
        <div>
          <img src={vision_logo} alt="vision logo " className='h-28' />
        </div>
        <div className='me-20'>
          <p >Contact: vision@gmail.com   |  Address:123 vision St,Ernakulam</p>
          <div className='mt-4 flex justify-end space-x-4 me-16'>
            <a className='hover:text-purple-400'>Twitter</a>
            <a className='hover:text-purple-400'>Facebook</a>
            <a className='hover:text-purple-400'>Linkedin</a>
          </div>
        </div>

      </div>

    </footer>
  )
}

export default Footer