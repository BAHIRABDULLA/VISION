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
    const [sessions, setSessions] = useState([])
    useEffect(() => {
        const fechBookingParticipant = async () => {
            const response = await getBookings()
            console.log(response, 'response in fetch booking participant');
            setSessions(response.data.bookings)
        }
        fechBookingParticipant()
    }, [])

    


    return (
        <div className="m-5">
            <h1 className="text-3xl font-bold text-center mb-6">Sessions of {role}s</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sessions.map((session, index) => (
                    <div
                        key={index}
                        className="bg-white text-black p-5 rounded-lg shadow-md"
                    >
                        <p className="font-semibold text-lg mb-2">Session</p>
                        <h3 className="text-xl font-medium">{role === 'mentee' ? session.mentorId : session.mentorId}</h3>
                        <h4 className="text-sm text-gray-600 mb-4">
                            Session Time - {session.time}
                        </h4>
                        <h4>Session Date - {session.date}</h4>

                        <Link to={`/dashboard/video-call/${session._id}`} state={{
                            bookingId: session._id, mentorId: session.mentorId,
                            menteeId: session.menteeId, userId:userId ,sessionTime: session.time,
                            sessionDate: session.date
                        }}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"

                        >
                            Enter Link
                        </Link >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoCallList;


