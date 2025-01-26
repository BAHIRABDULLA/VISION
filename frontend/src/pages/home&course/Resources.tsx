import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { getAllResourceWithCourseId } from '@/services/courseApi';

const Resources = () => {
    const { id } = useParams<{ id: string }>();
    const [activeLevel, setActiveLevel] = useState('Basic');
    const [resources, setResources] = useState([]); // State for all resources

    const levels = ['Basic', 'Intermediate', 'Advanced'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllResourceWithCourseId(id);
                if (response && response.data) {
                    setResources(response.data); // Assuming `response.data` contains the array of resources
                }
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };
        fetchData();
    }, [id]);

    // Filter resources based on active level
    const filteredResources = resources.filter((resource: any) => resource.level === activeLevel);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-600">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-64 bg-slate-200 dark:bg-slate-700">
                        <div className="px-8 border-b dark:border-gray-600">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Levels</h1>
                        </div>
                        <nav className="py-4">
                            {levels.map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setActiveLevel(level)}
                                    className={`w-full px-6 py-3 text-left hover:bg-gray-100 transition-colors duration-300 ${
                                        activeLevel === level
                                            ? 'bg-blue-50 text-purple-600 font-semibold'
                                            : 'text-black dark:text-white hover:text-gray-900'
                                    }`}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)} Level
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-grow px-8">
                        <div className="grid md:grid-cols-2 gap-4">
                            {filteredResources.length > 0 ? (
                                filteredResources.map((resource: any) => (
                                    <div
                                        key={resource._id}
                                        className="p-4   rounded-lg "
                                    >
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {resource.title}
                                        </h2>
                                        <p className="text-gray-700 dark:text-gray-400">
                                            {resource.content}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                    No resources available for {activeLevel} level.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resources;
