import React from 'react'
import CourseList from '@/components/CourseList'
import { Link } from 'react-router-dom'

const PopularCourses: React.FC = () => {
  return (
    <section className='py-16 w-full'>
      <div className='container mx-auto px-4 lg:px-10'>
        <h2 className='text-4xl text-center font-bold text-gray-900 dark:text-white mb-12'>
          Popular Courses
        </h2>
        <div className='max-w-6xl mx-auto'>
          <CourseList limit={3} />
          <div className="text-center mt-12">
            <Link to='/courses'
              className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors
              dark:bg-purple-700 dark:hover:bg-purple-800"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularCourses