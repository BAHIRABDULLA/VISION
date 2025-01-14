import { useEffect, useState } from 'react';
import {
    Book,
    Video,
    Image,
    ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import { getAllResourceWithCourseId } from '@/services/courseApi';
import { useParams } from 'react-router-dom';

// Sample content data
const learningContent = {
    basic: {
        videos: [
            { id: 1, title: "Introduction to Basics", duration: "10:35", description: "Learn fundamental concepts" },
            { id: 2, title: "Fundamental Techniques", duration: "15:22", description: "First steps in mastering skills" }
        ],
        images: [
            { id: 1, title: "Concept Diagram", description: "Visualizing key principles" },
            { id: 2, title: "Process Flow", description: "Step-by-step breakdown" }
        ],
        documents: [
            { id: 1, title: "Beginner's Guide", pages: 12, description: "Comprehensive introduction" },
            { id: 2, title: "Quick Reference", pages: 5, description: "Essential knowledge at a glance" }
        ]
    },
    intermediate: {
        videos: [
            { id: 1, title: "Advanced Techniques", duration: "22:45", description: "Elevate your skills" },
            { id: 2, title: "Complex Problem Solving", duration: "18:10", description: "Tackle challenging scenarios" }
        ],
        images: [
            { id: 1, title: "Advanced Concepts", description: "In-depth visualization" },
            { id: 2, title: "Detailed Schematics", description: "Comprehensive overview" }
        ],
        documents: [
            { id: 1, title: "Deep Dive Manual", pages: 25, description: "Extensive exploration" },
            { id: 2, title: "Case Studies", pages: 18, description: "Real-world applications" }
        ]
    },
    advanced: {
        videos: [
            { id: 1, title: "Expert Level Strategies", duration: "35:20", description: "Mastery-level insights" },
            { id: 2, title: "Cutting-Edge Techniques", duration: "29:55", description: "Advanced methodologies" }
        ],
        images: [
            { id: 1, title: "Complex System Architecture", description: "Intricate design patterns" },
            { id: 2, title: "Advanced Workflow", description: "Cutting-edge approach" }
        ],
        documents: [
            { id: 1, title: "Comprehensive Expert Guide", pages: 45, description: "Ultimate reference" },
            { id: 2, title: "Research Compendium", pages: 32, description: "Scholarly deep dive" }
        ]
    }
};

const ContentCard = ({ item, contentType }) => {
    const iconMap = {
        videos: <Video className="text-blue-600 w-6 h-6" />,
        images: <Image className="text-green-600 w-6 h-6" />,
        documents: <Book className="text-purple-600 w-6 h-6" />
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
            {iconMap[contentType]}
            <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">
                    {item.description ||
                        (contentType === 'videos' ? `Duration: ${item.duration}` :
                            contentType === 'documents' ? `${item.pages} pages` : '')}
                </p>
            </div>
            <ChevronRight className="text-gray-400 w-5 h-5" />
        </div>
    );
};

const Resources = () => {
    const { id } = useParams<{ id: string }>()
        console.log(id, 'id is here in resources page');
    const [activeLevel, setActiveLevel] = useState('basic');
    const [activeContentType, setActiveContentType] = useState('videos');


    const levels = ['basic', 'intermediate', 'advanced'];
    const contentTypes = ['videos', 'images', 'documents'];

    useEffect(() => {  
        const fetchData = async () => {
            const response = await getAllResourceWithCourseId(id);
            console.log(response, 'response in get resources in Resources page');
        };
        fetchData();
    }
    , []);
    return (
        <>
            <Header />
            <div className='min-h-screen bg-gray-100 dark:bg-gray-600'>
                <div className="flex ">
                    {/* Sidebar */}
                    <div className="w-64 bg-slate-200 dark:bg-slate-700">
                        <div className="px-8 border-b dark:border-gray-600">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Levels</h1>
                        </div>

                        {/* Level Navigation */}
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
                        {/* Content Type Tabs */}
                        <div className="mb-6 border-b flex space-x-4 dark:border-gray-600">
                            {contentTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setActiveContentType(type)}
                                    className={`pb-2 capitalize ${activeContentType === type
                                        ? 'border-b-2 border-blue-600 text-purple-500 dark:text-purple-400'
                                        : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* Content Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {learningContent[activeLevel][activeContentType].map((item) => (
                                <ContentCard
                                    key={item.id}
                                    item={item}
                                    contentType={activeContentType}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Resources;