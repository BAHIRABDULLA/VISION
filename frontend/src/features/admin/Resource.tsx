import React from 'react'

const Resource = () => {

  const resources = [
    { id: 1, name: "Tuples", type: "Image", course: 'Python', level: "Basic", status: "Active" },
    { id: 2, name: "useContext", type: "Document", course: "Javascript", level: "Advanced", status: "Active" },
    { id: 3, name: "Java Lambda", type: "Video", course: "Java", level: "Intermediate", status: "Inactive" }
];
  return (
    <div className='p-6'>
            <div className="flex justify-between items-center mb-4">
                <h2 className='text-2xl font-bold'>Courses</h2>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Add Course</button>
            </div>
            <table className='min-w-full border border-gray-300'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className=' px-4 py-2'>Sl No</th>
                        <th className=' px-4 py-2'>Name</th>
                        <th className=' px-4 py-2'>Type</th>
                        <th className=' px-4 py-2'>Course</th>
                        <th className=' px-4 py-2'>Level</th>
                        <th className=' px-4 py-2'>Status</th>
                        <th className=' px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map((resource, index) => (
                        <tr key={resource.id} className='hover:bg-gray-50 border-b'>
                            <td className=' px-4 py-2'>{index + 1}</td>
                            <td className=' px-4 py-2'>{resource.name}</td>
                            <td className=' px-4 py-2'>{resource.type}</td>
                            <td className=' px-4 py-2'>{resource.course}</td>
                            <td className=' px-4 py-2'>{resource.level}</td>
                            <td className=' px-4 py-2'>{resource.status}</td>
                            <td className=' px-4 py-2'>
                                <button className='px-3 py-1 mr-2 text-white bg-yellow-400 rounded-lg hover:bg-yellow-500'>Edit</button>
                                <button className='px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default Resource