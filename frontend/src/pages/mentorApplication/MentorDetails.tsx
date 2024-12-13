import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { ChevronLeft, PenTool, ChevronRight, Star, MapPin, Clock, Calendar, Mail, Video, MessageSquare } from 'lucide-react';
import PricingOptions from '@/pages/mentorApplication/PricingOptions';
import { useParams } from 'react-router-dom';
import { mentorSpecificData } from '@/services/mentorApi';
import BookingSession from './BookingSession';
import RatingAndReview from '@/features/user/RatingAndReview';

interface MentorData {
    jobTitle: string;
    category: string;
    company: string;
    country: string;
    location: string;
    experience: number
    skills: string[];
    socialMediaUrls: { [key: string]: string };
    introVideoUrl: string;
    featuredArticleUrl?: string;
    introductionVideoUrl: string;
    bio: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
    monthlySubscriptionPrice: number;
    singleSessionPrice: number;
    mentor: any
    slots: any;
}

const MentorDetails: React.FC = () => {



    const [activeTab, setActiveTab] = useState('about');
    const { id } = useParams()
    console.log(id, 'id ind ttoo')
    // Mock mentor data
    // const [mentor, setMentor] = useState<MentorData | undefined>(undefined)
    const [mentorData, setMentorData] = useState<MentorData | undefined>(undefined)
    console.log(mentorData, 'mentor')
    console.log(mentorData?.mentor._id, 'mentor.mentor ', mentorData?.mentor);

    
    const [groupedSlots, setGroupedSlots] = useState<Record<string, string[]>>({})

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                if (id) {
                    const respnose = await mentorSpecificData(id)
                    console.log(respnose, 'response in fetch mentor data');
                    const { mentor, slots } = respnose?.data || {}
                    console.log(mentor, 'mentor in fetch mentor data ');
                    console.log(slots, 'slots in fetch mentor data');

                    const slotGrouped: Record<string, string[]> = {}

                    slots.slots.forEach((slot) => {
                        slot.availableDays.forEach((day) => {
                            if (!slotGrouped[day]) {
                                slotGrouped[day] = [];
                            }

                            const [hour, minute] = slot.time.split(':')
                            // console.log(hour, 'hour', minute, 'minute')
                            const period = +hour >= 12 ? 'PM' : 'AM';
                            const formattedHour = +hour > 12 ? +hour - 12 : +hour === 0 ? 12 : +hour
                            const formattedTime = `${formattedHour}:${minute} ${period}`
                            console.log(formattedTime, 'formatted time')
                            slotGrouped[day].push(formattedTime)
                            // console.log(slotGrouped[day],'slotGrouped[day]');
                        });
                    });
                    setGroupedSlots(slotGrouped)
                    console.log(groupedSlots, 'groupded sltos');
                    setMentorData({ ...mentor, slots })
                }
            } catch (error) {
                console.error('Error founded in fetchmentor data', error);
            }
        }
        fetchMentorData()
    }, [])



    return (
        <div className="bg-slate-800 min-h-screen">
            <Header />

            {/* Back Navigation */}
            <div className="container mx-auto px-8 py-4">
                <button onClick={() => window.history.back()} className="flex items-center text-gray-400 hover:text-white">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back to Mentors</span>
                </button>
            </div>

            <div className="container mx-auto px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-8">
                        {/* Profile Header */}
                        <div className="bg-gray-700 rounded-lg p-6 flex flex-col md:flex-row gap-6 mb-8">
                            <div className="w-40 h-40 flex-shrink-0">
                                <img
                                    src={mentorData?.mentor.profile}
                                    alt='Profile'
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-col md:flex-row justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">{mentorData?.mentor?.fullName}</h1>
                                        <p className="text-gray-300 flex items-center mt-1">
                                            <MapPin className="text-blue-500 w-4 h-4 mr-1" />
                                            {mentorData?.location}
                                        </p>
                                        <p className='text-gray-300'>{mentorData?.country}</p>
                                        <p className="text-xl text-white mt-2">{mentorData?.jobTitle}</p>
                                        {mentorData?.company && <p className="text-gray-400">at {mentorData?.company}</p>}

                                    </div>
                                    <div className="mt-4 md:mt-0 md:text-right">
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-500 mr-1" />
                                            {/* <span className="text-white font-bold">{mentor.rating}</span> */}
                                            {/* <span className="text-gray-400 ml-1">({mentor.totalReviews} reviews)</span> */}
                                        </div>
                                        <p className="text-xl font-bold text-white mt-2">{mentorData?.monthlySubscriptionPrice}/month</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {mentorData?.skills?.map((skill, index) => (
                                        <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="bg-gray-700 rounded-lg mb-4">
                            <div className="flex border-b border-gray-700">
                                {['about', 'reviews'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 px-4 py-3 text-center capitalize ${activeTab === tab
                                            ? 'text-purple-500 border-b-2 border-purple-500'
                                            : 'text-gray-300 hover:text-white'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-gray-700 rounded-lg p-6">
                            {activeTab === 'about' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">About Me</h3>
                                    <p className="text-gray-300 whitespace-pre-line">{mentorData?.bio}</p>

                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-purple-500" />
                                            <div className='flex gap-4'>
                                                <p className="text-sm text-gray-300">Experience</p>
                                                <p className="font-medium mb- text-white">{mentorData?.experience}+ years</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                  <RatingAndReview/>  
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="lg:col-span-4">
                        <div className="space-y-6">
                            {/* Booking Card */}
                            <PricingOptions single={mentorData?.singleSessionPrice} monthly={mentorData?.monthlySubscriptionPrice}
                                mentorId={mentorData?.mentor._id} />

                        </div>
                    </div>

                </div>
                <BookingSession slots={groupedSlots} mentorId={mentorData?.mentor._id} />
                <div className="bg-gray-700  p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Options</h3>
                    <div className="space-y-3">

                        <button className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            Chat
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors">
                            <Video className="w-5 h-5" />
                            Schedule Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorDetails;