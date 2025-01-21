import { useEffect, useState } from 'react'
import { ChevronLeft, Star } from 'lucide-react';
import Header from '@/components/Header';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '@/services/courseApi';
import Loading from '@/components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import { loadStripe } from '@stripe/stripe-js'
import { createCheckoutSession, getAllCourseReviews, getCoursePaymentDetails } from '@/services/paymentApi';
import { Link } from 'react-router-dom';
import RatingAndReview from '@/components/RatingAndReview';
import CurriculumCard from '@/features/user/CurriculumCard';


const publicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

const stripePromise = loadStripe(publicKey)


interface Curriculum {
    level: string;
    topics: string[];
}
interface CourseDetailProps {
    name: string;
    duration: string
    overview: string;
    curriculum: Curriculum[]
    image: string;
    price: number;
}
const CourseDetails = () => {


    const { id } = useParams<{ id: string }>()
    const [activeTab, setActiveTab] = useState('overview');

    const [course, setCourse] = useState<CourseDetailProps | null>(null)
    const [loading, setLoading] = useState(true)
    const [isPurchase, setIsPurchase] = useState(true)
    // const [review, setReview] = useState('')
    const [reviews, setReviews] = useState([])
    // const [isAddingReview, setIsAddingReview] = useState(false)

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            if (id) {
                const response = await getCoursePaymentDetails(id)
                if (response?.status === 200) {
                    setIsPurchase(false)
                } else {
                    setIsPurchase(true)
                }
            }
        }
        fetchPaymentDetails()
    }, [])

    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (id) {
                try {
                    const courseDetailById = await getCourseDetails(id)

                    if (courseDetailById?.data.success) {
                        setCourse(courseDetailById.data.course)
                    } else {
                        toast.error('Course didnt get')
                    }
                } catch (error) {
                    toast.error('Payment failed')
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchCourseDetails()
    }, [id])
    useEffect(() => {
        const fetchCourseReviews = async () => {
            const response = await getAllCourseReviews(id)
            if (response?.status === 200) {
                setReviews(response?.data.reviews)
            }
        }
        fetchCourseReviews()
    }, [])
    const handleEnroll = async () => {
        const stripe = await stripePromise
        try {
            if (!course?.price) {
                console.error('Price is not defined for the course.');
                return;
            }
            if (!id) {
                toast.error('Cannot process ,some error occured')
                return
            }
            if (!course?.price) toast.error('Price is not defined for the course.')

            const response = await createCheckoutSession({ price: course?.price, courseId: id })

            if (response?.status >= 400) {
                toast.error(response?.data.message)
                return
            }

            const result = await stripe?.redirectToCheckout({
                sessionId: response?.data.id
            })
            if (result?.error) {
                toast.error('Payment failed')
            }
        } catch (error) {
            toast.error('Please sign in your account')
            console.error('Error creating cehckout session', error);
        }
    }

    // const handleAddReview = async () => {
    //     try {
    //         if (!review) {
    //             toast.error('Review is empty')
    //             return
    //         }
    //         const data = {
    //             courseId: id,
    //             rating: 5,
    //             review: review
    //         }
    //         const response = await createCourseReview(data)
    //         if (response?.status && response?.status >= 400) {
    //             toast.error(response?.data.message || 'Failed to add review')
    //             return
    //         }
    //         toast.success('Review added successfully')
    //     } catch (error) {
    //     }
    //     setIsAddingReview(false)
    // }


    if (loading) return <Loading />
    return (
        <>

            <div className=' min-h-screen  px-6 md:px-20'>
                <Header />
                {/* Back Navigation */}
                <div className="container mx-auto px-8 py-4">
                    <button onClick={() => window.history.back()} className="flex items-center text-gray-400 hover:text-white">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Back to Courses</span>
                    </button>
                </div>
                <Toaster />
                <div className="flex justify-between items-start mb-12">

                    <div>
                        <h1 className="text-3xl text-gray-900 dark:text-white font-bold mb-2">{course?.name}</h1>
                    </div>
                    {isPurchase ? (
                        <div className="bg-gray-200 dark:bg-gray-800  p-4 rounded-lg text-center">
                            <div className="text-2xl text-gray-900 dark:text-white font-bold mb-2">₹ {course?.price}</div>
                            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold mb-2 hover:bg-purple-700"
                                onClick={handleEnroll}>
                                ENROLL!
                            </button>
                            <div className="flex justify-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg text-center">
                            <Link className='text-purple-600 dark:text-purple-400 font-bold hover:underline' to={`/resource/${id}`}>Open the Course</Link>
                        </div>
                    )}

                </div>

                {/* Tabs Navigation */}
                <div className="bg-gray-200 dark:bg-gray-600 rounded-lg mb-4">
                    <div className="flex border-b border-gray-700 dark:border-gray-700">
                        {['overview', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 px-4 py-3 text-center capitalize ${activeTab === tab
                                    ? 'text-purple-500 border-b-2  border-purple-500'
                                    : 'text-gray-600 dark:text-gray-200 hover:text-black '
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-300 dark:bg-gray-600 rounded-lg p-6 mb-12">
                    {activeTab === 'overview' && (
                        <div>
                            <h3 className="text-xl font-semibold dark:text-white mb-4">Overview</h3>
                            <p className="text-gray-600 dark:text-gray-400">Course Duration: Estimate {course?.duration}</p>

                            <p className=" dark:text-gray-200 whitespace-pre-line">{course?.overview}</p>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="space-y-6">
                            {/* Reviews */}
                            <RatingAndReview reviews={reviews} />
                        </div>
                    )}
                </div>
                {/* Course Curriculum */}
                <CurriculumCard course={course}/>
            </div>
            <Footer />
        </>
    )
}

export default CourseDetails