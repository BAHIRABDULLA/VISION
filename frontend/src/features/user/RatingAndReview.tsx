import { useState } from "react";

import { PenTool, Star } from "lucide-react";

const RatingAndReview = () => {

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
    const [newReview, setNewReview] = useState({
        author: '',
        position: '',
        rating: 0,
        content: ''
    })

    return (
        <div className="space-y-6">
            <div className="flex gap-2 cursor-pointer hover:opacity-80 "
                onClick={() => setIsAddingReview(!isAddingReview)}>
                <h5 className="text-white">Add a review</h5>
                <PenTool className="text-yellow-500 mt-1 w-5 h-4" />
            </div>
            {isAddingReview && (
                <div>
                    <div>
                        <div className="flex">
                            <span className="text-white mr-2">Rating:</span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star}
                                    className={`w-6 h-6  cursor-pointer `}
                                />
                            ))}
                        </div>

                    </div>
                    <div className="mt-3">
                        <textarea
                            name="content"
                            placeholder="Write your review here..."
                            className="w-full bg-gray-700 text-white p-2 rounded h-24"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-500"
                            onClick={() => setIsAddingReview(!isAddingReview)}>Cancel</button>
                        <button className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400">Submit Review</button>
                    </div>
                </div>
            )}

            <div className="max-h-[400px] overflow-y-auto pr-2">
                {mentorr.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 last:border-0 pb-6 last:pb-0 mb-4">
                        <div className="flex justify-between items-start">
                            <div >
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
                ))}
            </div>

        </div>
    )
}

export default RatingAndReview