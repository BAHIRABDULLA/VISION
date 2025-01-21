
const CurriculumCard = ({course}) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        Course Curriculum
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Basic Topics */}
                        <div className="bg-gray-200 dark:bg-gray-600 rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-purple-500 p-4">
                                <h3 className="text-lg font-semibold text-white">
                                    Basic Topics (Beginner)
                                </h3>
                            </div>
                            <ul className="p-6 space-y-3">
                                {course?.curriculum[0]?.topics?.map((topic, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-2 text-gray-700 dark:text-gray-200"
                                    >
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Intermediate Topics */}
                        <div className="bg-gray-200 dark:bg-gray-600 rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-purple-500 p-4">
                                <h3 className="text-lg font-semibold text-white">
                                    Intermediate Topics
                                </h3>
                            </div>
                            <ul className="p-6 space-y-3">
                                {course?.curriculum[1]?.topics?.map((topic, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-2 text-gray-700 dark:text-gray-200"
                                    >
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Advanced Topics */}
                        <div className=" bg-gray-200 dark:bg-gray-600 rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-purple-500 p-4">
                                <h3 className="text-lg font-semibold text-white">
                                    Advanced Topics
                                </h3>
                            </div>
                            <ul className="p-6 space-y-3">
                                {course?.curriculum[2]?.topics?.map((topic, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-2 text-gray-700 dark:text-gray-200"
                                    >
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
  )
}

export default CurriculumCard