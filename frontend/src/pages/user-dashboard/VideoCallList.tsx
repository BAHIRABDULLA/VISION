import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookings } from "@/services/mentorApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const VideoCallList: React.FC = () => {

    const role = useSelector((state: RootState) => state.menteeAuth.user?.role === 'mentee' ? 'mentee' : 'mentor')
    const user = useSelector((state: RootState) =>
        state.menteeAuth.user || state.mentorAuth.user
    );
    const userId = user.id
    const [session, setSession] = useState([])
    useEffect(() => {
        const fechBookingParticipant = async () => {
            const response = await getBookings()
            setSession(response.data.bookings)
        }
        fechBookingParticipant()
    }, [])
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
    }
    const [sessionHistory] = useState([
        {
            menteeId:{fullName:'lala'},
            date:'4343434',
            time:'3434324'
        },
        {
            menteeId:{fullName:'lala'},
            date:'4343434',
            time:'3434324'
        },
        {
            mentorId:{fullName:'lala'},
            date:'4343434',
            time:'3434324'
        },
        {
            menteeId:{fullName:'lala'},
            date:'4343434',
            time:'3434324'
        },
    ])
    return (
        <div className="m-5 min-h-full">
            <h1 className="text-3xl font-bold text-center mb-8">{role} Sessions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {session.map((session, index) => (
                    <div
                        key={index}
                        className="dark:bg-gray-600 bg-gray-300 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
                                    Session {index + 1}
                                </span>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>

                            <h3 className="text-xl font-semibold dark:text-white text-gray-800">
                                {role === 'mentee' ? session.mentorId.fullName : session.menteeId.fullName}
                            </h3>

                            <div className="space-y-2">
                                <div className="flex items-center dark:text-white text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">{session.time}</span>
                                </div>

                                <div className="flex items-center dark:text-white text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm dark:text-white">{session.date}</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to={`/dashboard/video-call/${session._id}`}
                            state={{
                                bookingId: session._id,
                                mentorId: session.mentorId,
                                menteeId: session.menteeId,
                                userId: userId,
                                sessionTime: session.time,
                                sessionDate: session.date
                            }}
                            className="mt-5 w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                        >
                            <span>Join Session</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                ))}
            </div>


            {/* History Button */}
            <button
                onClick={toggleHistory}
                className="fixed top-10 right-10 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                History
            </button>

            {/* History Slider */}
            {isHistoryOpen && (
                <div className="fixed top-13 right-0 w-80  h-full bg-gray-800 text-white shadow-lg overflow-y-scroll z-50">
                    <button
                        onClick={toggleHistory}
                        className="absolute top-3 left-3 text-gray-200 hover:text-white"
                    >
                        Close
                    </button>
                    <h2 className="text-xl font-bold text-center my-4">Session History</h2>
                    <div className="px-4 space-y-4">
                        {sessionHistory.map((history, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 p-4 rounded-lg shadow-md"
                            >
                                <h3 className="font-semibold">{history?.mentorId?.fullName || history?.menteeId?.fullName}</h3>
                                <p className="text-sm">Date: {history.date}</p>
                                <p className="text-sm">Time: {history.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoCallList;


