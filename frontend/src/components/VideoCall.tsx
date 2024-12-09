import React, { useState } from 'react'
import { io } from 'socket.io-client'
import { initMedia, makeCall, handleOffer, handleAnswer, handleCandidate, stopCall } from '@/utils/webRTCHandler'

const socket = io('http://localhost:4000', {
    withCredentials: true,
    path: '/messages',
    transports: ['websocket', 'polling']
})


const roomId = 'example_room'



const VideoCall = () => {

    const [isCallStarted, setIsCallStarted] = useState(false)

    const startCallHandler = async () => {
        socket.emit('join_room', roomId)

        socket.on('offer', handleOffer)
        socket.on('answer', handleAnswer)
        socket.on('candidate', handleCandidate)
        await initMedia()
        makeCall()
        setIsCallStarted(true)
    }
    const stopCallHandler = () => {
        stopCall()
        setIsCallStarted(false)
    }
    React.useEffect(() => {
        initMedia()
    }, [])
    return (
        <div>
            <div>
                <video id="localVideo" autoPlay playsInline hidden={!isCallStarted}></video>
                <video id="remoteVideo" autoPlay playsInline hidden={!isCallStarted}></video>
            </div>
            <div>
                {!isCallStarted ? (
                    <button className='px-3 py-3 bg-purple-600 rounded-lg text-white' onClick={startCallHandler}>Start Call</button>
                ) : (
                    <button className='px-3 py-3 bg-purple-600 rounded-lg text-white' onClick={stopCallHandler}>Stop Call</button>
                )}
            </div>

        </div>


    )
}

export default VideoCall