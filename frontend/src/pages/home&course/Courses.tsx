import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { getAllCourses } from '@/services/courseApi';
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



interface courseDetails {
  _id: string
  name: string;
  duration: string;
  overview: string;
  price: number;
  image: string
}
const Courses = () => {
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<courseDetails[]>([])
  useEffect(() => {

    const courseListFetch = async () => {
      try {
        const response = await getAllCourses()
        if(response.status&&response.status>=400){
          console.log('Cannot found course in Courses');
        }else{
          setCourses(response?.data.data || [])
        }
      } catch (error) {
        console.error('Error founded in course fetching', error);
      } finally {
        setLoading(false)
      }
    }
    courseListFetch()
  }, [])
  if (loading) {
    <Loading />
  }
  return (

    <div className="min-h-screen ">
      <Header />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Courses</h1>
      <div className='px-4 lg:px-20 '>
        {courses.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-gray-200 dark:bg-gray-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="max-h-28 w-full rounded-lg object-cover mb-4"
                />
                <h2 className="text-2xl mt-3 font-semibold text-gray-900 dark:text-white mb-2">
                  {course.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{course.overview}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Duration: {course.duration}</p>
                <p className="text-gray-900 dark:text-white mb-4 font-semibold">
                  Price: ₹ {course.price}
                </p>

                <Link
                  to={`/course/${course._id}`}
                  className="bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
