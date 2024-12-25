
import heroImage from '@/assets/becomementor_pre_head_img.png'

const Hero = () => {


  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-88px)] flex items-center">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-5xl  lg:text-6xl font-bold mb-6">
                <span className="text-purple-500">Transform</span> Your
                <br />
                Career Path Today
              </h1>
              <p className="text-lg mb-8 text-lightText dark:text-darkText">
                Get personalized mentorship from industry experts and access
                cutting-edge courses designed to accelerate your professional growth.
              </p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors">
                Start Learning
              </button>

              <div className="flex gap-16 mt-12">
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-lightText dark:text-white">5,000+</h3>
                  <p className="text-gray-500 dark:text-gray-400">Active Students</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-lightText dark:text-white">300+</h3>
                  <p className="text-gray-500 dark:text-gray-400">Expert Mentors</p>
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
    </>
  )
};

export default Hero;