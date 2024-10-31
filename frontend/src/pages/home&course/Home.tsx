import CourseCard from '@/components/CourseCard'
import CourseList from '@/components/CourseList'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/features/user/home/Hero'
import Testimonial from '@/features/user/home/Testimonial'
import React from 'react'


const Home: React.FC = () => {
  return (
    <div className='bg-slate-950 min-h-screen '>
      <Header />
      <Hero />

      <div className='py-10'>
        <h2 className='text-4xl text-center  font-bold text-white'>Our Courses</h2>
        <div className='rounded-lg px-10 mt-8'>
          <CourseList />
        </div>
      </div>

      <Testimonial />

      <Footer />
    </div>
  )
}

export default Home