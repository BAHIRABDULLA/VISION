import React from 'react'
import { useEffect, useState } from 'react'

interface Mentor {
  id: string
  name: string
  expertise: string
  image: string
}

const MentorSlider: React.FC = () => {
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      expertise: 'Full Stack Development',
      image: '/mentor1.jpg'
    },
    {
      id: '2',
      name: 'Michael Chen',
      expertise: 'UI/UX Design',
      image: '/mentor2.jpg'
    },
    {
      id: '3',
      name: 'Emma Williams',
      expertise: 'Data Science',
      image: '/mentor3.jpg'
    },
    {
      id: '4',
      name: 'James Wilson',
      expertise: 'Cloud Architecture',
      image: '/mentor4.jpg'
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      expertise: 'Product Management',
      image: '/mentor5.jpg'
    }
  ]

  return (
    <div className="py-16 overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-10">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Learn from Industry Experts
        </h2>

        <div className="relative">
          {/* Gradient Overlay - Left */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-900 z-10" />

          {/* Gradient Overlay - Right */}
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-100 to-transparent dark:from-gray-900 z-10" />

          {/* Sliding Track */}
          <div className="flex animate-scroll">
            {/* Double the mentors array for continuous scroll effect */}
            {[...mentors, ...mentors].map((mentor, index) => (
              <div
                key={`${mentor.id}-${index}`}
                className="flex-none w-72 mx-4"
              >
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                    {mentor.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 text-center">
                    {mentor.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default MentorSlider

// Add this to your global CSS
const styles = `
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}`