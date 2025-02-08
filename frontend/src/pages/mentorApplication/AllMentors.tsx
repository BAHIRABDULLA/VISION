import Header from '@/components/Header';
// import Pagination from '@/components/Pagination';
import { Pagination, MenuItem, Select } from '@mui/material';
import { getAllCategories, getAllMentorsWithParamsData } from '@/services/mentorApi';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import { debounce } from 'lodash'
import Search from '@/components/Search';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const MentorPage: React.FC = () => {
    const mode = useSelector((state: RootState) => state.theme.mode)
    const [sortBy, setSortBy] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
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
    //     setCurrentPage(page);
    // };
    const [categories, setCategories] = useState([])

    const [mentors, setMentors] = useState([]);
    const fetchMentors = useCallback(async () => {
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

            const resposne = await getAllMentorsWithParamsData(paramsData)
            if (resposne?.data) {
                setMentors(resposne.data.data)
                setTotalPages(resposne?.data.pagination.totalPages)
            }
        } catch (error) {
            console.error('Error fetching mentors', error);

        } finally {
            setLoading(false)
        }

    }, [searchQuery, filters, currentPage])
    useEffect(() => {
        fetchMentors()
    }, [fetchMentors])
    const handleSearchChangeDebounced = useCallback(
        debounce((value: string) => {
            setSearchQuery(value);
        }, 200),
        []
    );
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChangeDebounced(e.target.value)
    };
    if (loading) {
        <Loading />
    }
    const handleFilterChangeDebounced = useCallback(
        debounce((name: string, value: string | number) => {
            setFilters(prev => ({ ...prev, [name]: value }));
        }, 500),
        []
    );
    const handleFilterChange = (name: string, value: string | number) => {
        // setFilters(prev => ({ ...prev, [name]: value }));
        handleFilterChangeDebounced(name, value)
    };

    const filteredMentors = mentors.filter((mentor) =>
        // mentor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        mentor.mentor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getAllCategories()
            if (response.status <= 400) {
                setCategories(response.data.response)
            }
        }
        fetchCategories()
    }, [])
    return (
        <div className="min-h-screen ">
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">


                    {/* Filters Section */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-gray-200 dark:bg-gray-600 p-4 lg:p-6 rounded-lg shadow-lg sticky top-20">
                            <h3 className="text-lg font-semibold mb-4 lg:mb-6 text-gray-800 dark:text-white">Filters</h3>

                            <div className="space-y-4 lg:space-y-6">
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Price Range</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="500"
                                            value={filters.priceRange}
                                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                            className="w-full"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">₹{filters.priceRange}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Experience Level</label>
                                    <select
                                        className="w-full p-2  rounded bg-white dark:bg-gray-500 text-gray-700 dark:text-white"
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
                                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Expertise</label>
                                    <select
                                        className="w-full p-2  rounded bg-white dark:bg-gray-500 text-gray-700 dark:text-white"
                                        value={filters.expertise}
                                        onChange={(e) => handleFilterChange('expertise', e.target.value)}
                                    >
                                        <option value="any">Any</option>
                                        {categories?.map((category, index: number) => (
                                            <option key={index} value={category?.name}>{category?.name}</option>

                                        ))}
                                        {/* <option value="frontend">Frontend Development</option>
                                    <option value="backend">Backend Development</option>
                                    <option value="fullstack">Full Stack Development</option>
                                    <option value="cloud">Cloud Computing</option>
                                    <option value="product">Product Management</option> */}
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Minimum Rating</label>
                                    <select
                                        className="w-full p-2  rounded bg-white dark:bg-gray-500 text-gray-700 dark:text-white"
                                        value={filters.rating}
                                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                                    >
                                        <option value="any">Any</option>
                                        <option value="4.5">Above 4 stars</option>
                                        <option value="4">Above 3  stars</option>
                                        <option value="3.5">Above 2 stars</option>
                                        <option value="3.5">Above 1 stars</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Location</label>
                                    <select
                                        className="w-full p-2  rounded bg-white dark:bg-gray-500 text-gray-700 dark:text-white"
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
                    <div className="w-full md:w-3/4 space-y-6">
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end mb-6">
                            <div className="w-full "> {/* Updated width classes */}
                                <Search value={searchQuery} placeholder='Search for mentors..' onChange={handleSearchChange} />
                            </div>
                            <Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                variant="outlined"
                                sx={{
                                    backgroundColor: mode === 'dark' ? "rgba(255,255,255,0.1)" : "white",
                                    color: mode === 'dark' ? "white" : "black",
                                    borderColor: mode === 'dark' ? "gray" : "black",
                                }}
                            >
                                {/* Name Sorting */}
                                <MenuItem value="name-asc">A to Z </MenuItem>
                                <MenuItem value="name-desc">Z to A </MenuItem>

                                {/* Price Sorting */}
                                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                                <MenuItem value="price-desc">Price: High to Low</MenuItem>

                                {/* Experience Sorting */}
                                <MenuItem value="experience-asc">Experience: Low to High</MenuItem>
                                <MenuItem value="experience-desc">Experience: High to Low</MenuItem>
                            </Select>
                        </div>
                        <div className="space-y-6">

                            {filteredMentors.map((mentor) => (
                                <div key={mentor._id} className="rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row">
                                    {/* Mentor Image */}
                                    <div className="w-full sm:w-1/4 h-48 sm:h-auto">
                                        <img
                                            src={mentor.mentor.profile}
                                            alt={mentor.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Mentor Details */}
                                    <div className="bg-gray-100 dark:bg-gray-600 text-white w-full sm:w-3/4 p-4 lg:p-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{mentor.mentor.fullName}</h3>
                                                <p className="text-sm  text-gray-800 dark:text-white">{mentor.location}</p>
                                            </div>
                                            <p className="text-xl font-bold text-gray-800 dark:text-white">₹ {mentor.singleSessionPrice}</p>
                                        </div>

                                        <p className="mt-2 text-lg text-gray-700 dark:text-white">{mentor.jobTitle}</p>

                                        {/* Rating */}
                                        <div className="mt-2 flex items-center">
                                            {Array.from({ length: Math.floor(mentor.rating) }, (_, i) => (
                                                <span key={i} className="text-yellow-500">★</span>
                                            ))}
                                            {mentor.rating % 1 !== 0 && <span className="text-yellow-500">★</span>}
                                            <span className="ml-2 text-gray-400">{mentor.rating}</span>
                                        </div>

                                        <div className="mt-4 ">
                                            <p className='text-darkBg dark:text-white break-words'>
                                                <span className="font-extrabold dark:text-blue-300 px-3 py-1 rounded text-sm">
                                                    {mentor?.experience}
                                                </span>Year experience in <span className='text-red-600 dark:text-yellow-400 ml-1'>{mentor.category}</span> field</p>
                                        </div>

                                        <Link to={`/mentor/${mentor._id}`} className="mt-4 bg-purple-500 text-center text-white py-2 px-6 rounded-full hover:bg-purple-600 transition-colors block w-full sm:w-auto sm:inline-block">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className='flex justify-center py-8'>
                <Pagination
                    count={totalPages}
                    variant="outlined"
                    size='large'
                    page={currentPage}
                    onChange={(_event, value) => setCurrentPage(value)}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: mode === 'dark' ? "white" : "purple",
                            borderColor: mode === 'dark' ? "lightgray" : "purple",
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: mode === 'dark'
                                ? "rgba(255, 255, 255, 0.2)"
                                : "rgba(0, 0, 0, 0.1)",
                        },
                        "& .Mui-selected": {
                            backgroundColor: mode === 'dark' ? "rgb(75 85 99)" : 'white',
                            color: mode === 'dark' ? 'white' : 'purple',
                        },
                    }}
                />
            </div>
        </div>





    );
};

export default MentorPage;