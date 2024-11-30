import Header from '@/components/Header';
// import Pagination from '@/components/Pagination';
import Pagination from '@mui/material/Pagination';
import { getAllMentors } from '@/services/mentorApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';

const MentorPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    console.log(currentPage, 'current page ')
    const [totalPages,setTotalPages]=useState(0)
    console.log(totalPages,'total pages')
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState({
        priceRange: 200,
        experience: 'any',
        expertise: 'any',
        rating: 'any',
        location: 'any'
    });
    // const totalPages = 10
    // const handlePageChange = (page: number) => {
    //     console.log(`Navigated to page ${page}`);
    //     setCurrentPage(page);
    // };
    const [mentors, setMentors] = useState([
        // {
        //     id: 1,
        //     fullName: 'John Doe',
        //     countryCode: 'US',
        //     jobTitle: 'Senior Software Engineer',
        //     description: 'Experienced mentor in full-stack development and cloud computing.',
        //     slotsAvailable: 5,
        //     pricePerMonth: '$200',
        //     rating: 4.5,
        //     image: 'https://via.placeholder.com/150',
        //     experience: '10+ years',
        //     expertise: ['Full Stack', 'Cloud Computing']
        // },
        // {
        //     id: 2,
        //     fullName: 'Jane Smith',
        //     countryCode: 'UK',
        //     jobTitle: 'Product Manager',
        //     description: 'Specializes in product management and business strategy.',
        //     slotsAvailable: 3,
        //     pricePerMonth: '$180',
        //     rating: 4.8,
        //     image: 'https://via.placeholder.com/150',
        //     experience: '8 years',
        //     expertise: ['Product Management', 'Strategy']
        // },
    ]);
    console.log(mentors,'mentros in all mentors ')

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                setLoading(true)
                const paramsData = {
                    search: searchQuery,
                    priceRange: filters.priceRange,
                    experience: filters.experience,
                    expertise: filters.expertise,
                    rating: filters.rating,
                    location: filters.location,
                    page: currentPage,
                    limit: 10
                }
                console.log(paramsData, 'params data');

                const resposne = await getAllMentors(paramsData)
                console.log(resposne, 'response - - -  in useeffetct mentors');
                if(resposne?.data){
                    setMentors(resposne.data.data)
                    setTotalPages(resposne?.data.pagination.totalPages)
                }
            } catch (error) {
                console.error('Error fetching mentors',error);
                
            }finally{
                setLoading(false)
            }
        }
        fetchMentors()
    }, [searchQuery, filters, currentPage])
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    if(loading){
        <Loading/>
    }
    const handleFilterChange = (name: string, value: string | number) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredMentors = mentors.filter((mentor) =>
        // mentor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    mentor.mentor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-slate-800 min-h-screen">
            <Header />
            <div className="container mx-auto px-28 py-8 flex gap-12">
                {/* Filters Section */}
                <div className="w-1/4 sticky top-0 h-full">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-6">Filters</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 font-medium">Price Range</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        value={filters.priceRange}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                        className="w-full"
                                    />
                                    <span className="text-sm">${filters.priceRange}</span>
                                </div>
                            </div>

                            {/* <div>
                                <label className="block mb-2 font-medium">Availability</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={filters.availability}
                                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                                >
                                    <option value="any">Any</option>
                                    <option value="1-2">1-2 slots</option>
                                    <option value="3-5">3-5 slots</option>
                                    <option value="5+">5+ slots</option>
                                </select>
                            </div> */}

                            <div>
                                <label className="block mb-2 font-medium">Experience Level</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={filters.experience}
                                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                                >
                                    <option value="any">Any</option>
                                    <option value="1-3">1-3 years</option>
                                    <option value="4-7">4-7 years</option>
                                    <option value="8+">8+ years</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Expertise</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={filters.expertise}
                                    onChange={(e) => handleFilterChange('expertise', e.target.value)}
                                >
                                    <option value="any">Any</option>
                                    <option value="frontend">Frontend Development</option>
                                    <option value="backend">Backend Development</option>
                                    <option value="fullstack">Full Stack Development</option>
                                    <option value="cloud">Cloud Computing</option>
                                    <option value="product">Product Management</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Minimum Rating</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={filters.rating}
                                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                                >
                                    <option value="any">Any</option>
                                    <option value="4.5">4.5+ stars</option>
                                    <option value="4">4+ stars</option>
                                    <option value="3.5">3.5+ stars</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Location</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                >
                                    <option value="any">Any</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="EU">Europe</option>
                                    <option value="ASIA">Asia</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mentor Cards Section */}
                <div className="w-8/12 space-y-6">
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
                        <div key={mentor._id} className="bg-gray-700 rounded-lg shadow-lg overflow-hidden flex">
                            {/* Mentor Image */}
                            <div className="w-1/4">
                                {/* <img
                                    src={mentor.image}
                                    alt={mentor.fullName}
                                    className="w-full h-full object-cover"
                                /> */}
                            </div>

                            {/* Mentor Details */}
                            <div className="text-white w-3/4 p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold">{mentor.mentor.fullName}</h3>
                                        {/* <p className="text-sm text-gray-400">{mentor.countryCode}</p> */}
                                        <p className="text-sm text-gray-400">{mentor.location}</p>
                                    </div>
                                    {/* <p className="text-xl font-bold">{mentor.pricePerMonth}/month</p> */}
                                    <p className="text-xl font-bold">₹ {mentor.singleSessionPrice}</p>
                                </div>

                                <p className="mt-2 text-lg text-gray-300">{mentor.jobTitle}</p>

                                {/* Rating */}
                                <div className="mt-2 flex items-center">
                                    {Array.from({ length: Math.floor(mentor.rating) }, (_, i) => (
                                        <span key={i} className="text-yellow-500">★</span>
                                    ))}
                                    {mentor.rating % 1 !== 0 && <span className="text-yellow-500">★</span>}
                                    <span className="ml-2 text-gray-400">({mentor.rating})</span>
                                </div>

                                {/* <p className="mt-3 text-gray-300">{mentor.description}</p> */}
                                <p className="mt-3 text-gray-300">{mentor.bio}</p>

                                <div className="mt-4 flex items-center gap-4">
                                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                        {/* {mentor.slotsAvailable} slots available */}
                                    </span>
                                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                        {mentor?.experience}
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    {/* {mentor.expertise.map((exp, index) => (
                                        <span key={index} className="bg-gray-700  text-gray-300 px-3 py-1 rounded-full text-sm">
                                            {exp}
                                        </span>
                                    ))} */}
                                </div>

                                <Link to={`/mentor/${mentor._id}`} className="mt-6 bg-purple-500 text-center text-white py-2 px-6 rounded-full hover:bg-purple-600 transition-colors block">
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> */}
            <div className='flex justify-center'>
                <Pagination count={10} variant="outlined" size='large'
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "white", // Change text color
                            borderColor: "white", // Change border color
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)", // Hover effect
                        },
                        "& .Mui-selected": {
                            backgroundColor: "white", // Selected page background
                            color: "darkblue", // Selected page text color
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default MentorPage;