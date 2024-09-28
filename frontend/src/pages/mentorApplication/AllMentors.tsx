import Header from '@/components/Header';
import React, { useState } from 'react';

const MentorPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mentors, setMentors] = useState([
        {
            id: 1,
            fullName: 'John Doe',
            countryCode: 'US',
            jobTitle: 'Senior Software Engineer',
            description: 'Experienced mentor in full-stack development and cloud computing.',
            slotsAvailable: 5,
            pricePerMonth: '$200',
            rating: 4.5,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            fullName: 'Jane Smith',
            countryCode: 'UK',
            jobTitle: 'Product Manager',
            description: 'Specializes in product management and business strategy.',
            slotsAvailable: 3,
            pricePerMonth: '$180',
            rating: 4.8,
            image: 'https://via.placeholder.com/150',
        },
        // Add more mentor objects as needed
    ]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredMentors = mentors.filter((mentor) =>
        mentor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='bg-slate-950 '>
            <div>
                <Header/>
            </div>
            <div className="container mx-auto px-28 py-8 flex ">
                
                {/* Filters Section */}
                <div className="w-1/4 pr-8 sticky top-0 h-full">
                    <div className="bg-gray-100 p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-6">Filters</h3>
                        <div>
                            <label className="block mb-4">Price Range</label>
                            <input type="range" className="w-full mb-4" />
                        </div>
                        <div>
                            <label className="block mb-4">Availability</label>
                            <select className="w-full p-2 border border-gray-300 rounded mb-4">
                                <option>Any</option>
                                <option>1-2 slots</option>
                                <option>3-5 slots</option>
                                <option>5+ slots</option>
                            </select>
                        </div>
                       
                    </div>
                </div>

                {/* Mentor Cards Section */}
                <div className="w-3/4 space-y-6">
                    <div className="flex justify-end mb-6">
                        <input
                            type="text"
                            placeholder="Search for mentors..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="p-2 border border-gray-300 rounded w-1/2"
                        />
                    </div>

                    {filteredMentors.map((mentor) => (
                        <div key={mentor.id} className="bg-white p-6 rounded shadow flex space-x-6">
                            {/* Mentor Image */}
                            <div className="w-1/4">
                                <img
                                    src={mentor.image}
                                    alt={mentor.fullName}
                                    className="rounded-full object-cover w-24 h-24"
                                />
                            </div>

                            {/* Mentor Details */}
                            <div className="w-3/4">
                                <h3 className="text-xl font-semibold">{mentor.fullName}</h3>
                                <p className="text-sm text-gray-500">{mentor.countryCode}</p>
                                <p className="mt-2">{mentor.jobTitle}</p>

                                {/* Rating */}
                                <div className="mt-2 flex items-center">
                                    {Array.from({ length: Math.floor(mentor.rating) }, (_, i) => (
                                        <span key={i} className="text-yellow-500">&#9733;</span>
                                    ))}
                                    {mentor.rating % 1 !== 0 && <span className="text-yellow-500">&#9733;</span>}
                                    <span className="ml-2 text-gray-500">({mentor.rating} stars)</span>
                                </div>

                                <p className="mt-2 text-sm">{mentor.description}</p>

                                <p className="mt-2">
                                    <span className="font-bold">{mentor.slotsAvailable}</span> slots available
                                </p>

                                <p className="mt-2 text-xl font-bold">{mentor.pricePerMonth}/month</p>

                                <button className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default MentorPage;
