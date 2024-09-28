import React from 'react'

interface CourseCardProps {
    title:string;
    image:string;
    price:string;
    rating:string
}


const CourseCard:React.FC<CourseCardProps> = ({title,image,price,rating}) => {
  return (
    <div className='bg-gray-800 p-4 rounded-md text-center'>
        <img src={image} className='w-full h-40 object-cover rounded-md' alt="" />
        <h3 className='mt-4 text-xl text-white font-bold'>{title}</h3>
        <p className="mt-2 text-purple-400">Price: {price}</p>
        <p className="mt-1 text-yellow-400">Rating: {rating} ★</p>
    </div>
  )
}

export default CourseCard