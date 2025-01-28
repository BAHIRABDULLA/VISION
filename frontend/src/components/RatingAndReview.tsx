import { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PenTool} from "lucide-react";
import toast from "react-hot-toast";
import { createReview, getAllReviews } from "@/services/paymentApi";
import { Rating, Typography } from "@mui/material";

type reviewRatingType = {
    _id: string
    review: string,
    rating: number,
    createdAt: Date,
    userId: {
        fullName: string
    }
}

const RatingAndReview = ({ id, reviewType }) => {

    const [review, setReview] = useState('')
    const [starValue, setStarValue] = useState(2)
    const [reviews, setReviews] = useState<reviewRatingType[]>([])




    const [isAddingReview, setIsAddingReview] = useState(false)


    const handleAddReview = async () => {
        try {
            if (!review) {
                toast.error('Review is empty')
            }
            const data = {
                courseIdOrMentorId: id,
                rating: starValue,
                review: review,
                reviewType
            }
            const response = await createReview(data)

            if (response?.status && response?.status >= 400) {
                toast.error(response?.data.message || 'Failed to add review')
                setIsAddingReview(false)
                return
            }
            fetchGetAllReviews()
            toast.success('Review successfully Added')

            setIsAddingReview(false)
        } catch (error) {
            console.error('Error founded in handle add mentorshipe review', error);
            setIsAddingReview(false)
        }
    }
    const fetchGetAllReviews = useCallback(async () => {
        const response = await getAllReviews(id, reviewType)
        if (response?.status === 200) {
            setReviews(response?.data.reviews)
        }
    }, [])
 
    useEffect(() => {
        fetchGetAllReviews()
    }, [])

    return (
        <div className="space-y-6 ">
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
                            <Typography component="legend">Rating:</Typography>
                            <Rating
                                name="simple-uncontrolled"
                                onChange={(_e, value) => setStarValue(value)}
                                defaultValue={2}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <textarea
                            name="content" onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review here..."
                            className="w-full bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-300 p-2 rounded h-24"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="bg-gray-600 dark:bg-gray-600 text-white dark:text-gray-300 px-4 py-1 rounded hover:bg-gray-500 dark:hover:bg-gray-500"
                            onClick={() => setIsAddingReview(!isAddingReview)}>
                            Cancel
                        </button>
                        <button onClick={handleAddReview}
                            className="bg-yellow-500 text-black dark:bg-yellow-400 dark:text-gray-800 px-4 py-1 rounded hover:bg-yellow-400 dark:hover:bg-yellow-500">
                            Submit Review
                        </button>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="max-h-[400px] overflow-y-auto pr-2">
                {reviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-700 last:border-0 pb-6 last:pb-0 mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold ">{review?.userId?.fullName}</p>
                                {/* <p className="text-sm text-gray-700 dark:text-gray-500">{review.position}</p> */}
                            </div>
                            <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-4 h-4 ${i < review?.rating ? "text-yellow-500" : "text-gray-400"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className=" dark:text-gray-200 mt-2">{review?.review}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            {new Date(review?.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RatingAndReview