import { getAllCourses } from '@/services/courseApi';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import CourseCard from './CourseCard';
import Button from './Button';


interface CourseCardProps {
    _id : string
    name: string;
    image: string;
    price: string;
    rating: string
  }
  
  
const CourseList = () => {

    const [courses, setCourses] = useState<CourseCardProps[]>([])

    const [loading, setLaoding] = useState(true)
  
    useEffect(() => {
      const fetchCourseData = async () => {
        const response = await getAllCourses()
        console.log(response?.data,'response data ');
        
        setCourses(response?.data.data)
        setLaoding(false)
      }
      fetchCourseData()
    }, [])
  
    if (loading) {
      <Loading />
    }
  return (
    <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          id = {course._id}
          name={course.name}
          image={course.image}
          price={course.price}
          rating={course.rating}
        />
      ))}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
        <Button text="Browse All Courses" customClasses="bg-purple-500 text-white hover:bg-purple-600" />
      </div>
    </div>
  )
}

export default CourseList