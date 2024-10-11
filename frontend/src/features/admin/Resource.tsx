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
        <h2 className='text-2xl font-bold'>Resources</h2>
        <button className='px-4 py-2 border border-gray-500 hover:font-semibold  shadow-lg text-black rounded-lg'>Add Resources</button>
      </div>
      <table className='min-w-full border shadow border-gray-300'>
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
                <button className='px-3 py-1 underline hover:no-underline hover:text-yellow-500'>Edit</button>
                <button className='px-3 py-1 underline hover:no-underline hover:text-red-600'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Resource