import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { getAllResourceWithCourseId } from '@/services/courseApi';

const Resources = () => {
    const { id } = useParams<{ id: string }>();
    const [activeLevel, setActiveLevel] = useState('Basic');
    const [resources, setResources] = useState([]);
    
    const levels = ['Basic', 'Intermediate', 'Advanced'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllResourceWithCourseId(id);
                setResources(response.data.response);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };
        fetchData();
    }, [id]);

    const filteredResources = resources.filter((resource: any) => resource.level === activeLevel);

    return (
        <>
            <Header />
            <div className="min-h-screen ">
                {/* Top Navigation */}
                <div className="">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center space-x-4 py-4">
                            {levels.map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setActiveLevel(level)}
                                    className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                                        activeLevel === level
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-500'
                                    }`}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)} Level
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid md:grid-cols-2 gap-4">
                        {filteredResources.length > 0 ? (
                            filteredResources.map((resource) => (
                                <div key={resource._id} className="p-4 rounded-lg bg-white shadow-md">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {resource.title}
                                    </h2>
                                    {resource.type === 'text' && (
                                        <p className="text-gray-700 dark:text-gray-400">{resource.content}</p>
                                    )}
                                    {resource.type === 'image' && (
                                        <img src={resource.content} alt={resource.title} className="w-full h-auto rounded-md" />
                                    )}
                                    {resource.type === 'video' && (
                                        <video controls className="w-full rounded-md">
                                            <source src={resource.content} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
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
        </>
    );
};

export default Resources;