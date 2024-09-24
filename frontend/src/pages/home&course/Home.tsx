import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'


const Home:React.FC = () => {
  return (
    <div className='bg-slate-950 min-h-screen '>
      <Header/>
      <h3 className='text-3xl text-red-500'>Home</h3>
      
      <Footer/>
    </div>
  )
}

export default Home