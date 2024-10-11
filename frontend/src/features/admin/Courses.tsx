import React from 'react'
import { Link } from 'react-router-dom';
const Courses = () => {
    // Placeholder data for courses, this can come from a state or props in a real application
    const courses = [
        { id: 1, name: "Python", duration: "9 Months", price: "$99", status: "Active" },
        { id: 2, name: "JavaScript", duration: "6 Months", price: "$89", status: "Active" },
        { id: 3, name: "Java", duration: "12 Months", price: "$120", status: "Inactive" }
    ];

    return (
        <div className='p-6'>
            <div className="flex justify-between items-center mb-4">
                <h2 className='text-2xl font-bold'>Courses</h2>
                <Link to='/admin/courses/add' className='px-4 py-2 hover:font-semibold border border-gray-500 shadow-lg text-black rounded-lg'>Add Course</Link>
            </div>
            <table className='min-w-full border shadow-lg border-gray-300 '>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className=' px-4 py-2'>Sl No</th>
                        <th className=' px-4 py-2'>Name</th>
                        <th className=' px-4 py-2'>Duration</th>
                        <th className=' px-4 py-2'>Price</th>
                        <th className=' px-4 py-2'>Status</th>
                        <th className=' px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={course.id} className='hover:bg-gray-50 border-b'>
                            <td className=' px-4 py-2'>{index + 1}</td>
                            <td className=' px-4 py-2'>{course.name}</td>
                            <td className=' px-4 py-2'>{course.duration}</td>
                            <td className=' px-4 py-2'>{course.price}</td>
                            <td className=' px-4 py-2'>{course.status}</td>
                            <td className=' px-4 py-2'>
                                <button className='px-3 py-1 hover:no-underline hover:text-yellow-600 underline'>Edit</button>
                                <button className='px-3 py-1 hover:no-underline hover:text-red-600 underline'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;
