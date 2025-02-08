import { getAllMentors } from '@/services/mentorApi'
import React, { useEffect } from 'react'

interface User{
  fullName:string;
  profile:string
}

interface Mentor {
  _id: string
  category: string
  mentor:User
}


const MentorSlider: React.FC = () => {
  const [mentors, setMentors] = React.useState<Mentor[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await getAllMentors();
        setMentors(response.data.response||[]);
      } catch (error) {
        console.error(error);
        setMentors([]);
      }
    };
    fetchMentors();
  }, []);

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
          <div className="flex w-full animate-scroll">
            {/* Double the mentors array for seamless scrolling */}
            {[...mentors, ...mentors].map((mentor, index) => (
              <div
                key={`${mentor._id}-${index}`}
                className="flex-none w-72 mx-4"
              >
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                  <img
                    src={mentor?.mentor?.profile}
                    alt={mentor?.mentor?.fullName}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                    {mentor?.mentor?.fullName}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 text-center">
                    {mentor?.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSlider;


// Add this to your global CSS


