import { getAllCourses } from '@/services/courseApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface CourseType {
 
    id: number;
    name: string;
    duration: string;
    overview: string;
    curriculum: string;
    price: number;
    image?: string;
    isActive: boolean;
}


const Courses = () => {
    const [courses, setCourses] = useState<CourseType[] | undefined>([]);
    useEffect(()=>{
        const fetchCourseData = async ()=>{
            const response = await getAllCourses()
            setCourses(response?.data.data)
        }
        fetchCourseData()
    },[])
    // const courses = [
    //     { id: 1, name: 'Python', duration: '9 Months', price: '$99', status: 'Active' },
    //     { id: 2, name: 'JavaScript', duration: '6 Months', price: '$89', status: 'Active' },
    //     { id: 3, name: 'Java', duration: '12 Months', price: '$120', status: 'Inactive' }
    // ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800">Courses List</h2>
                <Link
                    to="/admin/courses/add"
                    className="px-4 py-2 hover:font-semibold border border-gray-500 shadow-lg text-black rounded-lg"
                >
                    Add Course
                </Link>
            </div>

            {/* Courses Table */}
            <div className="shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-16 py-3 px-5 text-left uppercase tracking-wider">Sl No</th>
                            <th className="py-3 px-5 text-left uppercase tracking-wider">Name</th>
                            <th className="py-3 px-5 text-left uppercase tracking-wider">Duration</th>
                            <th className="py-3 px-5 text-left uppercase tracking-wider">Price</th>
                            <th className="py-3 px-5 text-left uppercase tracking-wider">Status</th>
                            <th className="py-3 px-5 text-left uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses && courses.length > 0 ? (
                            courses.map((course, index) => (
                                <tr
                                    key={course.id}
                                    className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                >
                                    <td className="py-3 px-5 text-gray-700">{index + 1}</td>
                                    <td className="py-3 px-5 text-gray-700">{course.name}</td>
                                    <td className="py-3 px-5 text-gray-700">{course.duration}</td>
                                    <td className="py-3 px-5 text-gray-700">{course.price}</td>
                                    <td className="py-3 px-5">
                                        <span
                                            className={`px-3 py-1 inline-block text-sm rounded-full ${course.isActive === true
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {course.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-5 flex items-center gap-4">
                                        <Link
                                            to={`/admin/courses/edit/${course.id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button className="text-red-500 hover:text-red-700">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-4 text-center font-semibold text-gray-500">
                                    No courses found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Courses;
