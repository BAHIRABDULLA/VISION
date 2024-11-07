import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react';
import Header from '@/components/Header';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '@/services/courseApi';
import Loading from '@/components/Loading';
import toast from 'react-hot-toast';
import Footer from '@/components/Footer';
import {loadStripe} from '@stripe/stripe-js'
import { createCheckoutSession } from '@/services/paymentApi';


const publicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
console.log(publicKey,'public key');

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


    const handleEnroll = async () =>{
        const stripe = await stripePromise
        try {
            console.log(id,'id in handelenrolle');
            
            const response = await createCheckoutSession({price:course?.price,id})
            const  result = await stripe?.redirectToCheckout({
                sessionId:response?.data.id
            })
            if(result?.error){
                toast.error(result.error.message)
            }
        } catch (error) {
            console.error('Error creating cehckout session',error);
        }
    }


    const { id } = useParams<{ id: string }>()
    console.log(id, 'id is here bro  . . . ');
    const [course, setCourse] = useState<CourseDetailProps | null>(null)
    const [loading, setLoading] = useState(true)

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
                    console.error('Error founded in fething details', error);
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchCourseDetails()
    }, [id])

    if (loading) return <Loading />
    return (
        <>

            <div className='bg-slate-800 min-h-screen  px-6 md:px-20'>
                <Header />
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-3xl text-white font-bold mb-2">{course?.name}</h1>
                        <p className="text-gray-400">Course Duration: Estimate {course?.duration}</p>
                    </div>
                    <div className="bg-slate-500 p-4 rounded-lg text-center">
                        <div className="text-2xl text-white font-bold mb-2">$ {course?.price}</div>
                        <button className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold mb-2"
                        onClick={handleEnroll}>
                            ENROLL!
                        </button>
                        <div className="flex justify-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>
                </div> 

                {/* Course Overview */}
                <section className="mb-12">
                    <h2 className="text-xl text-white font-bold mb-4">Course Overview</h2>
                    <div className="bg-slate-500/50 p-6 rounded-lg">
                        <p className="text-gray-300 mb-4">
                            {course?.overview}
                            Embark On The Most Intensely Active-In-Demand Programming Language Today. This Course Is Designed For Those Looking To Python Programming To Advance In Computing Taking You Build The Skills Necessary For Software Development, Data Analysis, Automation, And Web Applications.
                        </p>
                        <ul className="list-disc pl-6 text-gray-300">
                            <li className="mb-2">Write Efficient Python Code And Build Real-Own Projects</li>
                            <li className="mb-2">Learn Core Python Programming Concepts And Data Structures</li>
                            <li className="mb-2">Develop Web Applications Using Python Frameworks</li>
                            <li className="mb-2">Whether You're New To Programming Or Looking To Expand Your Skills, This Course Provides The Tools And Resources To Excel In Python And Beyond</li>
                        </ul>
                    </div>
                </section>

                {/* Course Curriculum */}
                <section className="mb-12">
                    <h2 className="text-xl text-white font-bold mb-4">Course Curriculum</h2>
                    <div className="bg-slate-500/50 p-6 rounded-lg">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold mb-4">Basic Topics (Beginner)</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Introduction To Python And Setup</li>
                                    <li>Control Structure Of This Course</li>
                                    <li>Functions And Modules</li>
                                    <li>Test</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4">Intermediate Topics</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Object-Oriented Programming (OOP) In Python</li>
                                    <li>Working With Dynamic Memory Parsers</li>
                                    <li>Test</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4">Advanced Topics</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li>Advanced OOP Concepts (Inheritance, Polymorphism)</li>
                                    <li>Multithreading And Concurrency</li>
                                    <li>Testing And Debugging</li>
                                    <li>Test</li>
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

                <Footer/>
                </div>
            </div>
        </>
    )
}

export default CourseDetails