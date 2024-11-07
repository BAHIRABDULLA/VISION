import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { getAllCourses } from '@/services/courseApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Sample data for courses (You might fetch this data from an API)
// const courses = [
//   {
//     id: 1,
//     title: 'Python for Beginners',
//     description: 'Learn the basics of Python, a powerful and versatile programming language.',
//     duration: '3 months',
//     price: '$99',
//   },
//   {
//     id: 2,
//     title: 'JavaScript Essentials',
//     description: 'Master the fundamentals of JavaScript and build dynamic web applications.',
//     duration: '2 months',
//     price: '$89',
//   },
//   {
//     id: 3,
//     title: 'React Development',
//     description: 'Learn how to create modern web applications with React.',
//     duration: '2 months',
//     price: '$109',
//   },
//   {
//     id: 4,
//     title: '.NET Core for Web Development',
//     description: 'Get started with .NET Core and build powerful web applications.',
//     duration: '3 months',
//     price: '$129',
//   },
// ];

interface courseDetails {
  _id:string
  name:string;
  duration:string;
  overview:string;
  price:number;
  image:string
}
const Courses = () => {
  const [loading,setLoading] = useState(true)
  const [courses,setCourses] = useState<courseDetails[]>([])
  useEffect(()=>{
    
    const courseListFetch = async ()=>{
      try {
        const response = await getAllCourses()
        console.log(response,'response, = = ');
        setCourses(response?.data.data || [])
      } catch (error) {
        console.error('Error founded in course fetching',error);
      }finally{
        setLoading(false)
      }
    } 
    courseListFetch()
  },[])
  if (loading) {
    <Loading />
  }
  return (
   
    <div className="bg-slate-800 min-h-screen  px-4 lg:px-20">
    <Header/>
      <h1 className="text-4xl font-bold text-center text-white mb-8">Our Courses</h1>
      {courses.length >0 ? (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-gray-600 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">{course.name}</h2>
            <p className="text-white mb-4">{course.overview}</p>
            <p className="text-white mb-2">Duration: {course.duration}</p>
            <p className="text-white mb-4 font-semibold">Price:  ₹   {course.price}</p>

            <Link
              to={`/course/${course._id}`}
              className="bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      ):(
        <p>Not founded</p>
      )}
      
    </div>
    
    
  );
};

export default Courses;
