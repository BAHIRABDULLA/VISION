import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, Calendar, Mail, Video, MessageSquare } from 'lucide-react';
import PricingOptions from '@/pages/mentorApplication/PricingOptions';
import { useParams } from 'react-router-dom';
import { mentorSpecificData } from '@/services/mentorApi';
import BookingSession from './BookingSession';

interface MentorData {
    jobTitle: string;
    category: string;
    company: string;
    location: string;
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
    const [mentor, setMentor] = useState<MentorData | undefined>(undefined)
    console.log(mentor, 'mentor')
    console.log(mentor?.mentor._id, 'mentor.mentor ', mentor?.mentor);

    const mentorr = {
        id: 1,
        fullName: 'John Doe',
        countryCode: 'US',
        location: 'San Francisco, CA',
        jobTitle: 'Senior Software Engineer',
        company: 'Tech Giants Inc.',
        description: 'Experienced mentor in full-stack development and cloud computing with over 10 years of industry experience. Passionate about helping others grow in their tech careers.',
        longBio: `I've been working in the tech industry for over a decade, specializing in full-stack development, cloud architecture, and helping teams scale their applications. I've mentored dozens of developers throughout my career, helping them advance their skills and careers.

        My approach to mentoring focuses on practical, hands-on learning combined with solid theoretical foundations. I believe in teaching not just the "how" but also the "why" behind technical decisions.`,
        slotsAvailable: 5,
        pricePerMonth: '$200',
        rating: 4.8,
        totalReviews: 47,
        image: 'https://via.placeholder.com/400',
        expertise: ['Full Stack Development', 'Cloud Computing', 'System Design', 'Career Growth'],
        languages: ['English', 'Spanish'],
        education: 'M.S. Computer Science, Stanford University',
        yearsOfExperience: 10,
        achievements: ['Built scalable systems serving millions of users', 'Led teams of 20+ engineers', 'Published technical author'],
        availability: [
            { day: 'Monday', slots: ['9:00 AM - 10:00 AM', '2:00 PM - 3:00 PM'] },
            { day: 'Wednesday', slots: ['11:00 AM - 12:00 PM', '4:00 PM - 5:00 PM'] },
            { day: 'Friday', slots: ['10:00 AM - 11:00 AM', '3:00 PM - 4:00 PM'] },
        ],
        reviews: [
            {
                id: 1,
                author: 'Sarah Johnson',
                rating: 5,
                date: '2024-03-15',
                content: 'John is an exceptional mentor. His deep knowledge and patient teaching style helped me grow significantly as a developer.',
                position: 'Frontend Developer'
            },
            {
                id: 2,
                author: 'Mike Chen',
                rating: 5,
                date: '2024-03-10',
                content: 'Incredibly knowledgeable and supportive. John helped me prepare for senior developer interviews and I landed my dream job!',
                position: 'Senior Software Engineer'
            },
            {
                id: 3,
                author: 'Lisa Rodriguez',
                rating: 4,
                date: '2024-03-01',
                content: 'Great mentor who provides practical advice and real-world examples. Very responsive and always prepared for our sessions.',
                position: 'Full Stack Developer'
            }
        ]
    };
    const [groupedSlots, setGroupedSlots] = useState<Record<string, string[]>>({})

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                if (id) {
                    const respnose = await mentorSpecificData(id)
                    console.log(respnose, 'response in fetch mentor data');
                    const { mentor, slots } = respnose?.data || {}

                    const slotGrouped: Record<string, string[]> = {}

                    slots.forEach((slot) => {
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
                    setMentor({ ...mentor, slots })
                }
            } catch (error) {
                console.error('Error founded in fetchmentor data', error);
            }
        }
        fetchMentorData()
    }, [])


    return (
        <div className="bg-slate-950 min-h-screen">
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
                        <div className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row gap-6 mb-8">
                            <div className="w-40 h-40 flex-shrink-0">
                                {/* <img
                                    src={mentor.image}
                                    alt={mentor.fullName}
                                    className="w-full h-full object-cover rounded-lg"
                                /> */}
                            </div>
                            <div className="flex-grow">
                                <div className="flex flex-col md:flex-row justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">{mentor?.mentor?.fullName}</h1>
                                        <p className="text-gray-400 flex items-center mt-1">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {mentor?.location}
                                        </p>
                                        <p className="text-xl text-gray-300 mt-2">{mentor?.jobTitle}</p>
                                        <p className="text-gray-400">at {mentor?.company}</p>
                                    </div>
                                    <div className="mt-4 md:mt-0 md:text-right">
                                        <div className="flex items-center">
                                            <Star className="w-5 h-5 text-yellow-500 mr-1" />
                                            {/* <span className="text-white font-bold">{mentor.rating}</span> */}
                                            {/* <span className="text-gray-400 ml-1">({mentor.totalReviews} reviews)</span> */}
                                        </div>
                                        <p className="text-xl font-bold text-white mt-2">{mentor?.monthlySubscriptionPrice}/month</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {mentor?.skills?.map((skill, index) => (
                                        <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="bg-gray-800 rounded-lg mb-4">
                            <div className="flex border-b border-gray-700">
                                {['about', 'experience', 'reviews'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 px-4 py-3 text-center capitalize ${activeTab === tab
                                            ? 'text-purple-500 border-b-2 border-purple-500'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-gray-800 rounded-lg p-6">
                            {activeTab === 'about' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">About Me</h3>
                                    <p className="text-gray-300 whitespace-pre-line">{mentor?.bio}</p>

                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-purple-500" />
                                            <div>
                                                <p className="text-sm text-gray-400">Experience</p>
                                                <p className="font-medium text-white">{mentor?.experience}+ years</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-purple-500" />
                                            <div>
                                                {/* <p className="text-sm text-gray-400">Languages</p>
                                                <p className="font-medium text-white">{mentor.languages.join(', ')}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'experience' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">Key Achievements</h3>
                                    <div className="space-y-4">
                                        {/* {mentor.achievements.map((achievement, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <Star className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                                                <p className="text-gray-300">{achievement}</p>
                                            </div>
                                        ))} */}
                                        {mentor?.greatestAchievement}
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mt-8 mb-4">Education</h3>
                                    {/* <p className="text-gray-300">{mentor.education}</p> */}
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    {/* {mentor.reviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-700 last:border-0 pb-6 last:pb-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-white">{review.author}</p>
                                                    <p className="text-sm text-gray-400">{review.position}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    {Array.from({ length: review.rating }).map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 text-yellow-500" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-300 mt-2">{review.content}</p>
                                            <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                                        </div>
                                    ))} */}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="lg:col-span-4">
                        <div className="space-y-6">
                            {/* Booking Card */}
                            <PricingOptions single={mentor?.singleSessionPrice} monthly={mentor?.monthlySubscriptionPrice}
                                mentorId={mentor?.mentor._id} />
                            {/* <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Book a Session</h3>

                                <div className="space-y-4">
                                    {mentorr?.availability.map((day, index) => (
                                        <div key={index}>
                                            <p className="text-sm font-medium text-white mb-2">{day.day}</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {day.slots.map((slot, slotIndex) => (
                                                    <button
                                                        key={slotIndex}
                                                        className={`p-2 text-sm rounded-lg border transition-colors ${selectedSlot === `${day.day}-${slot}`
                                                            ? 'bg-purple-500 border-purple-500 text-white'
                                                            : 'border-gray-600 hover:border-purple-500 text-gray-300'
                                                            }`}
                                                        onClick={() => setSelectedSlot(`${day.day}-${slot}`)}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="w-full mt-6 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!selectedSlot}
                                >
                                    Book Mentorship
                                </button>
                            </div> */}











                            {/* Contact Options */}
                            {/* <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Contact Options</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                                        <Mail className="w-5 h-5" />
                                        Send Message
                                    </button>
                                    <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                                        <Video className="w-5 h-5" />
                                        Schedule Call
                                    </button>
                                    <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                                        <MessageSquare className="w-5 h-5" />
                                        Quick Chat
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>

                </div>
                <BookingSession slots={groupedSlots} mentorId={mentor?.mentor._id} />
                <div className="bg-gray-800  p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Options</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                            <Mail className="w-5 h-5" />
                            Send Message
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                            <Video className="w-5 h-5" />
                            Schedule Call
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            Quick Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorDetails;