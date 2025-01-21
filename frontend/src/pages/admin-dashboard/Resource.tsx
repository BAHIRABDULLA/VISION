
import { getResources } from '@/services/courseApi';
import  { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Resource = () => {

  // const [resources,setResources] = useState([    { id: 1, title: "Tuples", type: "Image", course: 'Python', level: "Basic", status: "Active" },
  //   { id: 2, title: "useContext", type: "Document", course: "Javascript", level: "Advanced", status: "Active" },
  //   { id: 3, title: "Java Lambda", type: "Video", course: "Java", level: "Intermediate", status: "Inactive" }])


  const [resources,setResources] = useState([])
  if(resources){
    resources.map((res)=>{
    })
  }
 

  useEffect(()=>{
    const fetchResources = async ()=>{
      try {
        const response = await getResources()
        if(response?.status&&response?.status>=400){
          toast.error(response?.data.message || 'An error occured')
        }else{
        setResources(response?.data.resources)
        }
      } catch (error) {
        console.error('Error founded in fetch resource',error);
        toast.error('Internal server error')
      }
    }
    fetchResources()
  },[])
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Toaster/>
        <h2 className="text-4xl font-bold text-gray-800">Resources List</h2>
        <Link
          to="/admin/resources/add"
          className="px-4 py-2 hover:font-semibold border border-gray-500 shadow-lg text-black rounded-lg"
        >
          Add Resources
        </Link>
      </div>
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
                  <td className="py-3 px-5 text-gray-700">{resource.title}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.type}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.course.name}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.level}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 inline-block text-sm rounded-full ${resource.status === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {resource.status === true ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-5 flex items-center gap-4">
                    <Link to={`/admin/resources/${resource._id}`} className="text-green-500 hover:text-green-700">
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