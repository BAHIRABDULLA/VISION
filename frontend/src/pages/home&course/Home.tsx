import CourseCard from '@/components/CourseCard'
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
        <div className='grid grid-cols-3 gap-6 rounded-lg px-10 mt-8'>
          <CourseCard title='Python' image={''} price='$45.99' rating='4.9' />
          <CourseCard title='Python' image={''} price='$45.99' rating='4.9' />
          <CourseCard title='Python' image={''} price='$45.99' rating='4.9' />
        </div>
      </div>

      <Testimonial />

      <Footer />
    </div>
  )
}

export default Home