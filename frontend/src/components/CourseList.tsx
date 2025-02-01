import { getAllCourses } from '@/services/courseApi';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import CourseCard from './CourseCard';
import toast from 'react-hot-toast';

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


const CourseList: React.FC<CourseListProps> = ({ limit }: { limit?: number | null }) => {

  const [courses, setCourses] = useState<CourseCardProps[]>([])
  const displayedCourses = limit ? courses.slice(0, limit) : courses;

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await getAllCourses()
      if (response.status && response.status >= 400) {
        toast.error('Cannot found courses')
      } else if (response.status && response.status < 400) {
        setCourses(response?.data.data)
        setLoading(false)
      }

    }
    fetchCourseData()
  }, [])

  if (loading) {
    return <Loading />
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {displayedCourses.length > 0 ? (
        displayedCourses.map((course, index) => (
          <CourseCard
            key={index}
            id={course._id}
            name={course.name}
            image={course.image}
            price={course.price}
            rating={course.rating}
          />
        ))
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-300">No courses found.</p>
      )}

    </div>
  );
}

export default CourseList