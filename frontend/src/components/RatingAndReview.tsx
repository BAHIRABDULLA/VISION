import { useState } from "react";

import { PenTool, Star } from "lucide-react";
// import toast from "react-hot-toast";
// import { createCourseReview } from "@/services/paymentApi";

const RatingAndReview = (props) => {
console.log(props);

    // const review = props.review
    const mentorr = {
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
            },
            {
                id: 4,
                author: 'Sarah Johnson',
                rating: 5,
                date: '2024-03-15',
                content: 'John is an exceptional mentor. His deep knowledge and patient teaching style helped me grow significantly as a developer.',
                position: 'Frontend Developer'
            },
            {
                id: 5,
                author: 'Mike Chen',
                rating: 5,
                date: '2024-03-10',
                content: 'Incredibly knowledgeable and supportive. John helped me prepare for senior developer interviews and I landed my dream job!',
                position: 'Senior Software Engineer'
            },
            {
                id: 6,
                author: 'Lisa Rodriguez',
                rating: 4,
                date: '2024-03-01',
                content: 'Great mentor who provides practical advice and real-world examples. Very responsive and always prepared for our sessions.',
                position: 'Full Stack Developer'
            }
        ]
    };


    const [isAddingReview, setIsAddingReview] = useState(false)
    // const [newReview, setNewReview] = useState({
    //     author: '',
    //     position: '',
    //     rating: 0,
    //     content: ''
    // })

    // const handleAddReview = async () => {

    //     try {
    //         if (!review) {
    //             toast.error('Review is empty')
    //             return
    //         }
    //         const data = {
    //             courseId: 'id',
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

    return (
        <div className="space-y-6">
            {/* Add Review Button */}
            <div className="flex gap-2 cursor-pointer hover:opacity-80"
                onClick={() => setIsAddingReview(!isAddingReview)}>
                <h5 className="text-balck font-bold dark:text-gray-300">Add a review</h5>
                <PenTool className="text-yellow-500 mt-1 w-5 h-4" />
            </div>

            {/* Review Input Section */}
            {isAddingReview && (
                <div>
                    <div>
                        <div className="flex">
                            <span className=" dark:text-gray-300 mr-2">Rating:</span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-6 h-6 cursor-pointer text-yellow-500" />
                            ))}
                        </div>
                    </div>
                    <div className="mt-3">
                        <textarea
                            name="content"
                            placeholder="Write your review here..."
                            className="w-full bg-gray-200 dark:bg-gray-800 text-white dark:text-gray-300 p-2 rounded h-24"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="bg-gray-600 dark:bg-gray-600 text-white dark:text-gray-300 px-4 py-1 rounded hover:bg-gray-500 dark:hover:bg-gray-500"
                            onClick={() => setIsAddingReview(!isAddingReview)}>
                            Cancel
                        </button>
                        <button
                            className="bg-yellow-500 text-black dark:bg-yellow-400 dark:text-gray-800 px-4 py-1 rounded hover:bg-yellow-400 dark:hover:bg-yellow-500">
                            Submit Review
                        </button>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="max-h-[400px] overflow-y-auto pr-2">
                {mentorr.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 last:border-0 pb-6 last:pb-0 mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-black dark:text-gray-300">{review.author}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-500">{review.position}</p>
                            </div>
                            <div className="flex items-center">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-500" />
                                ))}
                            </div>
                        </div>
                        <p className=" dark:text-gray-200 mt-2">{review.content}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{review.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RatingAndReview