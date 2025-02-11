

import React from 'react';
import { getResources, updateResourceStatus } from '@/services/courseApi';
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Resource: React.FC = () => {


  const [resources, setResources] = useState([])



  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await getResources()
        if (response?.status && response?.status >= 400) {
          toast.error(response?.data.message || 'An error occured')
        } else {
          setResources(response?.data.resources)
        }
      } catch (error) {
        console.error('Error founded in fetch resource', error);
        toast.error('Internal server error')
      }
    }
    fetchResources()
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)

  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const openModal = (resource: any, status: string) => {
    setSelectedResource(resource)
    setSelectedStatus(status)

    setIsModalOpen(true)
  }
  const closeModal = () => {

    setIsModalOpen(false)
    setSelectedResource(null)
  }

  const confirmStatusChange = async () => {

    if (selectedResource) {

      const response = await updateResourceStatus(selectedResource._id, selectedStatus)
      if (response?.status >= 400) {
        toast.error(response?.data.message)
      } else {
        setResources(prevResouce => prevResouce?.map(resource =>
          resource._id === selectedResource._id ? { ...resource, status: selectedStatus } : resource))
        toast.success('Status updated')
      }
      closeModal()
    }
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Toaster />
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
                <tr key={resource._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="py-3 px-5 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.title}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.type}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.course.name}</td>
                  <td className="py-3 px-5 text-gray-700">{resource.level}</td>

                  <td className="px-3 py-1 ">
                    <select
                      value={resource.status} onChange={(e) => openModal(resource, e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    >
                      <option hidden disabled>{resource.status}</option>
                      <option value="active">Active</option>
                      <option value="block">Block</option>
                    </select>
                  </td>
                  <td className="py-3 px-5 flex items-center gap-4">
                    <Link to={`/admin/resources/${resource._id}`} className="text-blue-500 hover:text-blue-700">
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
                <td colSpan={7} className="py-4 text-center font-semibold text-gray-500">
                  Resources not found
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
          <strong>{selectedResource?.title}</strong>?
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

  )
}

export default Resource