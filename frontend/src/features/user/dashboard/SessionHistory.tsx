import  { useState } from 'react'

const SessionHistory = ({sessions,role}) => {
    const sessionHistory = sessions.filter((session)=>(session.status=='completed' || session.status == 'expired'))
    console.log(sessionHistory,'session history ');
    
    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
    }
    // const [sessionHistory, setSessionHistory] = useState([])
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={toggleHistory}
                    className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>History</span>
                </button>
            </div>
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${isHistoryOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        {/* <h2 className="text-xl font-bold dark:text-white">Session History</h2> */}
                        <button
                            onClick={toggleHistory}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                        >
                            <svg
                                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* History Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {sessionHistory.map((history, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-800 dark:text-white">
                                        {/* {history?.mentorId?.fullName || history?.menteeId?.fullName} */}
                                        {role==='mentor'?history?.menteeId?.fullName:history?.mentorId?.fullName}
                                    </h3>
                                    <span className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                                        Session {index + 1}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm">{new Date(history.date).toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric',weekday:'long'})}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm">{history.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SessionHistory