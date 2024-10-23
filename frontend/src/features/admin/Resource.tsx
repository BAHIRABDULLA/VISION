import React from 'react'

const Resource = () => {

  const resources = [
    { id: 1, name: "Tuples", type: "Image", course: 'Python', level: "Basic", status: "Active" },
    { id: 2, name: "useContext", type: "Document", course: "Javascript", level: "Advanced", status: "Active" },
    { id: 3, name: "Java Lambda", type: "Video", course: "Java", level: "Intermediate", status: "Inactive" }
  ];
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Resources List</h2>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-16 py-3 px-5 text-left uppercase tracking-wider">SL No</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Name</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Type</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Course</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Level</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Status</th>
              <th className="py-3 px-5 text-left uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {resources && resources.length > 0 ? (
              resources.map((resource, index) => (
                <tr key={resource.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="py-3 px-5 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.name}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.type}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.course}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.level}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 inline-block text-sm rounded-full ${resource.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {resource.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 flex items-center gap-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center font-semibold text-gray-500">
                  Resources not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Resource