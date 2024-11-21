import React,{useState,useEffect,useRef} from 'react';
import Button from '@/components/Button';
import heroImage from '@/assets/becomementor_pre_head_img.png'

const Hero = () => {
  const middleSectionRef = useRef<HTMLDivElement>(null)
  const [isInHero, setIsInHero] = useState(true)

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isInHero && event.deltaY > 0 && middleSectionRef.current) {
        event.preventDefault()
        middleSectionRef.current.scrollIntoView({ behavior: 'smooth' })
        setIsInHero(false)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isInHero])

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-88px)] flex items-center">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-5xl text-white lg:text-6xl font-bold mb-6">
                <span className="text-purple-500">Transform</span> Your
                <br />
                Career Path Today
              </h1>
              <p className="text-gray-300 text-lg mb-8">
                Get personalized mentorship from industry experts and access 
                cutting-edge courses designed to accelerate your professional growth.
              </p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors">
                Start Learning
              </button>

              <div className="flex gap-16 mt-12">
                <div>
                  <h3 className="text-white text-3xl font-bold mb-2">5,000+</h3>
                  <p className="text-gray-400">Active Students</p>
                </div>
                <div>
                  <h3 className="text-white text-3xl font-bold mb-2">300+</h3>
                  <p className="text-gray-400">Expert Mentors</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <img
                src={heroImage}
                alt="Career Development"
                className="w-full max-w-lg xl:max-w-xl h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div ref={middleSectionRef} className="py-20">
        <div className="container mx-auto px-4 lg:px-24">
          {/* Left Feature */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-10 max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Unlock Your Potential with Expert Mentorship
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Connect with professionals who can guide you at every step of your journey.
                Whether you're starting out or seeking an advanced role, our experienced 
                mentors are here to help you succeed.
              </p>
              <button className="border-2 border-purple-500 text-purple-500 px-8 py-3 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-colors">
                Connect with Mentor
              </button>
            </div>
          </div>

          {/* Right Feature */}
          <div className="flex justify-end">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-10 max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Explore Your Career Path
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Get personalized career guidance based on your skills and interests.
                Explore job market trends and discover exciting career opportunities
                that align with your goals.
              </p>
              <button className="text-purple-500 text-lg font-medium hover:text-purple-400 transition-colors flex items-center gap-2">
                Discover Your Path
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Hero;