import Button from '@/components/Button'
import React from 'react'

const Hero = () => {
  return (
      <section className='py-20 flex justify-between px-10'>
        <div>
            <h1 className='text-5xl font-bold text-purple-400'>Career Development</h1>
            <p className='mt-4 text-gray-300'>Unlock your potential with expert mentorship.</p>
            <div className='mt06 space-x-4'>
                <Button text="Start Now" customClasses='bg-purple-500 hover:bg-purple-600' />
                <Button text="Explore" customClasses='bg-gray-500 hover:bg-gray-600' />
            </div>
        </div>
        <div>
            <img src="" alt="Hero" className='h-64 w-64 object-contain' />
        </div>
      </section>
    
  )
}

export default Hero