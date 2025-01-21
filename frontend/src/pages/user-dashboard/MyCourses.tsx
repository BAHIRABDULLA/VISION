import { getPurchasedCourses } from '@/services/courseApi';
import React, { useEffect, useState } from 'react';

const MyCourses = () => {
  // Sample data - replace with your actual data source

  useEffect(() => {
    fetchCourses()
  }, []);
  const fetchCourses = async () => {
    try {
      const response = await getPurchasedCourses();
      
      // const response = await fetch('https://api.example.com/courses');
      // const data = await response.json();
      // setCourses(data);
    } catch (error) {
      console.error('Error fetching courses: ', error);
    }
  }
  const [courses] = useState([
    {
      id: 1,
      title: 'Complete JavaScript Course',
      instructor: 'John Doe',
      progress: 65,
      lastAccessed: '2025-01-10',
      thumbnail: '/api/placeholder/280/160',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'UX Design Fundamentals',
      instructor: 'Jane Smith',
      progress: 30,
      lastAccessed: '2025-01-14',
      thumbnail: '/api/placeholder/280/160',
      category: 'Design'
    },
    {
      id: 3,
      title: 'Data Science Basics',
      instructor: 'Mike Johnson',
      progress: 90,
      lastAccessed: '2025-01-13',
      thumbnail: '/api/placeholder/280/160',
      category: 'Data Science'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h1>
        
        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Courses</h3>
            <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {courses.filter(course => course.progress < 100).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {courses.filter(course => course.progress === 100).length}
            </p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    {course.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  Instructor: {course.instructor}
                </p>
                
                {/* Progress Bar */}
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      Progress: {course.progress}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${course.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                    />
                  </div>
                </div>
                
                {/* Continue Button */}
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;