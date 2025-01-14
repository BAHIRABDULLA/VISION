import { Link } from "react-router-dom"


const Hero2 = () => {
    return (

        <div className="py-20">
            {/* <div ref={middleSectionRef} className="py-20"> */}
            <div className="container mx-auto px-4 lg:px-24">
                {/* Left Feature */}
                <div className="mb-20">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-10 max-w-2xl">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Unlock Your Potential with Expert Mentorship
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                            Connect with professionals who can guide you at every step of your journey.
                            Whether you're starting out or seeking an advanced role, our experienced
                            mentors are here to help you succeed.
                        </p>
                        <Link to='/mentors'  className="border-2 border-purple-500 text-purple-500 px-8 py-3 rounded-lg font-medium
                         hover:bg-purple-500 hover:text-white transition-colors dark:hover:bg-purple-600 dark:hover:text-gray-100" >
                            Explore Mentors
                         </Link>
                    </div>
                </div>

                {/* Right Feature */}
                <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-10 max-w-2xl">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Explore Your Career Path
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
                            Get personalized career guidance based on your skills and interests.
                            Explore job market trends and discover exciting career opportunities
                            that align with your goals.
                        </p>
                        <button className="text-purple-500 text-lg font-medium hover:text-purple-400 transition-colors flex items-center gap-2 dark:hover:text-purple-300">
                            Discover Your Path
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Hero2