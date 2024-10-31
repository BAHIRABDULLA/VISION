import React from 'react';
import Button from '@/components/Button';
import heroImage from '@/assets/becomementor_pre_head_img.png'

const Hero = () => {
  return (
    <section>
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

          <div className="pl-4 md:pl-8">
            <h1 className="text-purple-500 text-4xl md:text-5xl font-bold mb-2">
              Career Development
            </h1>
            <p className="text-gray-400 mb-4 max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vivamus eget dolor sit amet.
            </p>
            <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition-colors">
              LEARN MORE
            </button>

            <div className="flex gap-8 mt-8">
              <div>
                <h3 className="text-white text-2xl font-bold">5,000+</h3>
                <p className="text-gray-400">Students</p>
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">300+</h3>
                <p className="text-gray-400">Resources</p>
              </div>
            </div>
          </div>


          <div className="flex justify-end items-center">
            <img
              src="/path-to-your-illustration.svg"
              alt="Career Development"
              className="w-[400px] h-[300px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mt-20 flex flex-col gap-8">

        <div className='bg-gray-800 rounded-lg p-8 max-w-lg ms-20'>
          <h2 className="text-white text-3xl font-bold mb-4">
            Unlock Your Potential<br />with Expert Mentorship
          </h2>
          <p className="text-gray-400 mb-6">
            Connect with professionals who can guide you at every step of your journey.
            Whether you're a junior or seeking an advanced role, our experienced mentors are
            here to help.
          </p>
          <button className="text-purple-500 border border-purple-500 px-6 py-2 rounded-md hover:bg-purple-500 hover:text-white transition-colors">
            Connect with Mentor
          </button>
        </div>


        <div className="w-full flex justify-end ">
          <div className="bg-gray-800 p-6 rounded-lg max-w-sm">
            <h3 className="text-white text-xl font-bold mb-3">
              Explore Your Career Path
            </h3>
            <p className="text-gray-400 mb-4">
              You'll be guided career outcomes based on your aptitude and personal
              interests. Learn about the job market and explore alternative career choices.
            </p>
            <button className="text-purple-500 hover:text-purple-400">
              Discover Your Path →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;