import React, {  memo } from 'react'

import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: string
}


const CourseCard: React.FC<CourseCardProps> = memo(({ id, name, image, price, rating }) => {

  const navigate = useNavigate()
  const handleViewDetials = () => {
    console.log(id, 'id id i di di di di di ');

    navigate(`/course/${id}`)
  }
  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-700/50">
      <img src={image} className="w-full h-40 object-cover rounded-md mb-4" alt="" />
      <h3 className="text-xl text-gray-900 font-bold mb-2 dark:text-white">{name}</h3>
      <p className="text-purple-600 mb-2 dark:text-purple-400">Price: {price}</p>
      <p className="text-yellow-500 dark:text-yellow-400">Rating: {rating} ★</p>
      <button onClick={handleViewDetials} className='px-4 py-2 rounded-lg w-full bg-gray-200 text-gray-800 font-medium mt-3 hover:bg-gray-300
       dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'>View Details</button>
    </div>
  )
})


export default CourseCard