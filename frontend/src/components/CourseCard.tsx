import { getAllCourses } from '@/services/courseApi';
import React, { useEffect, useState, memo } from 'react'

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
    console.log(id,'id id i di di di di di ');
    
    navigate(`/course/${id}`)
  }
  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={image} className="w-full h-40 object-cover rounded-md mb-4" alt="" />
      <h3 className="text-xl text-white font-bold mb-2">{name}</h3>
      <p className="text-purple-400 mb-2">Price: {price}</p>
      <p className="text-yellow-400">Rating: {rating} ★</p>
      <button onClick={handleViewDetials} className='px-4 py-2 rounded-lg w-full bg-white mt-3'>View Details</button>
    </div>



  )
})


export default CourseCard