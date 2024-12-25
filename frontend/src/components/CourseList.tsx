import { getAllCourses } from '@/services/courseApi';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import CourseCard from './CourseCard';

interface CourseListProps {
  limit?: number;
}
interface CourseCardProps {
  _id: string
  name: string;
  image: string;
  price: string;
  rating: string
}


const CourseList: React.FC<CourseListProps> = ({ limit }) => {

  const [courses, setCourses] = useState<CourseCardProps[]>([])
  const displayedCourses = limit ? courses.slice(0, limit) : courses;

  const [loading, setLaoding] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await getAllCourses()
      console.log(response?.data, 'response data ');
      console.log(response?.data.data,'response,data.sdata');
      
      setCourses(response?.data.data)
      setLaoding(false)
    }
    fetchCourseData()
  }, [])

  if (loading) {
    <Loading />
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {displayedCourses.map((course, index) => (
        <CourseCard
          key={index}
          id={course._id}
          name={course.name}
          image={course.image}
          price={course.price}
          rating={course.rating}
        />
      ))}
    </div>
  );
}

export default CourseList