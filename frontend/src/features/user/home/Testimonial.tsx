import { getTopReviews } from "@/services/paymentApi"
import { useEffect, useState } from "react"

interface IReview {
    _id: string
    review: string
    userId: {
        fullName: string
    }
}

const Testimonial = () => {
    const [reviews, setReviews] = useState<IReview[]>([])    
    useEffect(()=>{
        const topReviews = async () => {
            try {
                const response  = await getTopReviews()
                setReviews(response?.data?.reviews || [])
            } catch (error) {
                console.error('Error fetching top reviews:', error);
                setReviews([])
            }
        }
        topReviews()
    },[])

    return (
        <section className="py-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <h2 className="text-4xl text-center font-bold">Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-10 mt-8">
                {reviews.map((review) => (
                    <div key={review._id} className="text-center bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <p className="italic">{review.review}</p>
                        <h3 className="mt-4 font-bold">- {review?.userId.fullName}</h3>
                    </div>
                ))}
                
            </div>
        </section>

    )
}

export default Testimonial