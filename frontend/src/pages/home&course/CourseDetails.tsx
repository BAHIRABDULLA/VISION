import React, { useEffect, useState } from 'react'
import { ChevronLeft, Star } from 'lucide-react';
import Header from '@/components/Header';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '@/services/courseApi';
import Loading from '@/components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import { loadStripe } from '@stripe/stripe-js'
import { createCheckoutSession, getCoursePaymentDetails } from '@/services/paymentApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Link } from 'react-router-dom';


const publicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
console.log(publicKey, 'public key');

const stripePromise = loadStripe(publicKey)

interface CourseDetailProps {
    name: string;
    duration: string
    overview: string;
    curriculum: string
    image: string;
    price: number;
}
const CourseDetails = () => {


    const { id } = useParams<{ id: string }>()
    console.log(id, 'id is here bro  . . . ');
    const [course, setCourse] = useState<CourseDetailProps | null>(null)
    const [loading, setLoading] = useState(true)
    const [isPurchase, setIsPurchase] = useState(true)
    useEffect(() => {
        const fetchPaymentDetails = async () => {
            if (id) {
                const response = await getCoursePaymentDetails(id)
                console.log(response, 'response in fetch payment details');
                if (response?.status === 200) {
                    setIsPurchase(false)
                }else{
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
                    console.log(courseDetailById, 'courseDetailById');

                    if (courseDetailById?.data.success) {
                        setCourse(courseDetailById.data.course)
                    } else {
                        toast.error('Course didnt get')
                    }
                } catch (error) {
                    toast.error('Payment failed')
                    console.error('Error founded in fething details', error);
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchCourseDetails()
    }, [id])

    const handleEnroll = async () => {
        const stripe = await stripePromise
        try {
            console.log(id, 'id in handelenrolle');
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
            console.log(response, 'response ')

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




    console.log(course?.curriculum[0].topics, 'course curriculum detailed here');


    if (loading) return <Loading />
    return (
        <>

            <div className='bg-slate-800 min-h-screen  px-6 md:px-20'>
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
                        <h1 className="text-3xl text-white font-bold mb-2">{course?.name}</h1>
                        <p className="text-gray-400">Course Duration: Estimate {course?.duration}</p>
                    </div>
                    {isPurchase ? (
                        <div className="bg-slate-500 p-4 rounded-lg text-center">
                            <div className="text-2xl text-white font-bold mb-2">₹ {course?.price}</div>
                            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold mb-2"
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
                        <div className="bg-slate-500 p-4 rounded-lg text-center">
                            <Link className='text-white font-bold' to='/resource'>Open the Course</Link>
                        </div>
                    )}

                </div>

                {/* Course Overview */}
                <section className="mb-12">
                    <h2 className="text-xl text-white font-bold mb-4">Course Overview</h2>
                    <div className="bg-slate-500/50 p-6 rounded-lg">
                        <p className="text-gray-300 mb-4">
                            {course?.overview}
                            {/* Embark On The Most Intensely Active-In-Demand Programming Language Today. This Course Is Designed For Those Looking To Python Programming To Advance In Computing Taking You Build The Skills Necessary For Software Development, Data Analysis, Automation, And Web Applications. */}
                        </p>
                        {/* <ul className="list-disc pl-6 text-gray-300">
                            <li className="mb-2">Write Efficient Python Code And Build Real-Own Projects</li>
                            <li className="mb-2">Learn Core Python Programming Concepts And Data Structures</li>
                            <li className="mb-2">Develop Web Applications Using Python Frameworks</li>
                            <li className="mb-2">Whether You're New To Programming Or Looking To Expand Your Skills, This Course Provides The Tools And Resources To Excel In Python And Beyond</li>
                        </ul> */}
                    </div>
                </section>

                {/* Course Curriculum */}
                <section className="mb-12">
                    <h2 className="text-xl text-white font-bold mb-4">Course Curriculum</h2>
                    <div className="bg-slate-500/50 p-6 rounded-lg">
                        {/* <h3 className='font-bold text-white'>{course?.curriculum}</h3><br /> */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-white mb-4">Basic Topics (Beginner)</h3>
                                <ul className="space-y-2 text-gray-300">
                                    {/* <h4>{course?.curriculum[0].topics}</h4> */}
                                    {course?.curriculum[0].topics?.map((topic, index) => (
                                        <li key={index}>{topic}</li>
                                    ))}
                                    {/* <li>Introduction To Python And Setup</li>
                                    <li>Control Structure Of This Course</li>
                                    <li>Functions And Modules</li>
                                    <li>Test</li> */}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-4">Intermediate Topics</h3>
                                <ul className="space-y-2 text-gray-300">
                                    {/* <h4>{course?.curriculum[1].topics}</h4> */}
                                    {course?.curriculum[1].topics?.map((topic, index) => (
                                        <li key={index}>{topic}</li>
                                    ))}
                                    {/* <li>Object-Oriented Programming (OOP) In Python</li>
                                    <li>Working With Dynamic Memory Parsers</li>
                                    <li>Test</li> */}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-4">Advanced Topics</h3>
                                <ul className="space-y-2 text-gray-300">
                                    {/* <h4>{course?.curriculum[2].topics}</h4> */}

                                    {course?.curriculum[2].topics?.map((topic, index) => (
                                        <li key={index}>{topic}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reviews */}
                <section>
                    <h2 className="text-xl text-white font-bold mb-4">Rating & Reviews</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((review) => (
                            <div key={review} className="bg-slate-500/50 p-4 rounded-lg flex items-start gap-4">
                                <div className="w-10 h-10 bg-gray-600 rounded-full flex-shrink-0" />
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold">Alex</span>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-300">
                                        Working with Python has been incredibly beneficial for me. I can truly recommend this journey from Vision to anyone in the programming world.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <div className='mt-5'>

                    <Footer />
                </div>
            </div>
        </>
    )
}

export default CourseDetails