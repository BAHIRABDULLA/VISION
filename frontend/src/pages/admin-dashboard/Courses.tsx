import { getAllCourses, updateCourseStatus } from '@/services/courseApi';
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import toast, { Toaster } from 'react-hot-toast';

Modal.setAppElement("#root")

export interface CourseType {

    _id: string;
    name: string;
    duration: string;
    overview: string;
    curriculum: string;
    price: number;
    status: string
    image?: string;
    // isActive: boolean;
}


const Courses = () => {
    const [courses, setCourses] = useState<CourseType[] | undefined>([]);    
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<string>("")
    const openModal = (course: CourseType, status: string) => {
        setSelectedCourse(course)
        setSelectedStatus(status)

        setIsModalOpen(true)
    }
    const closeModal = () => {

        setIsModalOpen(false)
        setSelectedCourse(null)
    }


    const confirmStatusChange = async () => {
        
        if (selectedCourse) {
            
            const response = await updateCourseStatus(selectedCourse._id,selectedStatus)
            if(response?.status>=400){
                toast.error(response?.data.message)
            }else{
                setCourses(prevCourses=>prevCourses?.map(course=>
                    course._id===selectedCourse._id?{...course,status:selectedStatus}:course))
                toast.success('Status updated')
            }
            closeModal()
        }
    }

    useEffect(() => {
        const fetchCourseData = async () => {
            const response = await getAllCourses()            
            setCourses(response?.data.courses || [])

        }
        fetchCourseData()
    }, [])


    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <Toaster/>
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
                                    key={course._id}
                                    className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                >
                                    <td className="py-3 px-5 text-gray-700">{index + 1}</td>
                                    <td className="py-3 px-5 text-gray-700">{course.name}</td>
                                    <td className="py-3 px-5 text-gray-700">{course.duration}</td>
                                    <td className="py-3 px-5 text-gray-700">{course.price}</td>
                                    {/* <td className="py-3 px-5">
                                        <span
                                            className={`px-3 py-1 inline-block text-sm rounded-full ${course.isActive === true
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {course.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td> */}

                                    <td className="px-3 py-1 ">
                                        <select
                                            value={course.status} onChange={(e) => openModal(course, e.target.value)}
                                            className="border border-gray-300 rounded p-1"
                                        >
                                            <option hidden disabled>{course.status}</option>
                                            <option value="active">Active</option>
                                            <option value="block">Block</option>
                                        </select>
                                    </td>

                                    <td className="py-3 px-5 flex items-center gap-4">
                                        <Link
                                            to={`/admin/courses/${course._id}`}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        {/* <button className="text-red-500 hover:text-red-700">
                                            Delete
                                        </button> */}
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
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Status Change"
                className="bg-white p-6 rounded shadow-lg max-w-md mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-lg font-semibold mb-4">Confirm Status Change</h2>
                <p>
                    Are you sure you want to change the status to <strong>{selectedStatus}</strong> for{" "}
                    <strong>{selectedCourse?.name}</strong>?
                </p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={confirmStatusChange}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Courses;
