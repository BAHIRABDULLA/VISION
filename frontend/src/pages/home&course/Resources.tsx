import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { getAllResourceWithCourseId, getSignedUrl } from '@/services/courseApi';

const Resources = () => {
    const { id } = useParams<{ id: string }>();
    const [activeLevel, setActiveLevel] = useState('Basic');
    const [resources, setResources] = useState([]);
    console.log(resources, 'resources');
    const [signedUrls, setSignedUrls] = useState<{ [key: string]: string }>({}); 
    console.log(signedUrls,'___________');
    

    const levels = ['Basic', 'Intermediate', 'Advanced'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllResourceWithCourseId(id);
                console.log(response,'response in rexours');
                
                if (response && response.data) {
                    const fetchedResources = response.data.response;

                    const urls = await Promise.all(
                        fetchedResources.map(async (resource: any) => {
                            if (resource.type === 'image' || resource.type === 'video') {
                                const fileType = resource.content.split('.').pop();
                                console.log(`${resource.type}/${fileType}`);
                                
                                const signedUrlResponse = await getSignedUrl(resource.content, `${resource.type}/${fileType}`);
                                console.log(signedUrlResponse,'signed url resonse');
                                
                                return { id: resource._id, url: signedUrlResponse.data.signedUrl };
                            }
                            return { id: resource._id, url: null };
                        })
                    );

                    const signedUrlsMap = urls.reduce((acc, item) => {
                        acc[item.id] = item.url;
                        return acc;
                    }, {} as { [key: string]: string });

                    setSignedUrls(signedUrlsMap);
                    setResources(fetchedResources);
                }
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
                                    className={`w-full px-6 py-3 text-left hover:bg-gray-100 transition-colors duration-300 ${activeLevel === level
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
                                filteredResources.map((resource) => (
                                    <div key={resource._id} className="p-4 rounded-lg bg-white shadow-md">
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {resource.title}
                                        </h2>
                                        {resource.type === 'text' && (
                                            <p className="text-gray-700 dark:text-gray-400">{resource.content}</p>
                                        )}
                                        {resource.type === 'image' && signedUrls[resource._id] && (
                                            <img src={signedUrls[resource._id]} alt={resource.title} className="w-full h-auto rounded-md" />
                                        )}
                                        {resource.type === 'video' && signedUrls[resource._id] && (
                                            <video controls className="w-full rounded-md">
                                                <source src={signedUrls[resource._id]} type={`video/${resource.content.split('.').pop()}`} />
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
            </div>
        </>
    );
};

export default Resources;
