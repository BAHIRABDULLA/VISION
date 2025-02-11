import { getPurchasedCourses } from '@/services/courseApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [myCourse, setMyCourse] = useState([])

  useEffect(() => {
    fetchCourses()
  }, []);
  const fetchCourses = async () => {
    try {
      const response = await getPurchasedCourses();
      setMyCourse(response.data?.response || [])
    } catch (error) {
      console.error('Error fetching courses: ', error);
      setMyCourse([])
    }
  }


  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center dark:text-white text-gray-900 mb-8">My Courses</h1>



        {/* Course Grid */}
        {myCourse.length == 0 ?
          (<div className="flex flex-col items-center justify-center h-80">
            <p className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
              You haven’t purchased any courses yet!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
              Explore our wide range of courses and start your learning journey today.
            </p>


            <Link
              to="/courses"
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Courses
            </Link>
          </div>) :
          (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {myCourse.map(course => (
              <div key={course._id} className="bg-gray-300 dark:bg-gray-600 rounded-lg shadow overflow-hidden">
                <img
                  src={course?.courseId.image}
                  alt={course?.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium dark:text-white text-purple-600">
                      {course.category}
                    </span>
                    <span className="text-sm dark:text-white text-gray-500">
                      Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
                    {course?.courseId.name}
                  </h2>


                  {/* Continue Button */}
                  <Link to={`/resource/${course.courseId._id}`} className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>)
        }
      </div>
    </div>
  );
};

export default MyCourses;