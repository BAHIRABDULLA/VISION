import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Card, CardContent, Button, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { getBookingDetails } from '@/services/mentorApi';

interface SessionValidation {
  isValid: boolean;
  message: string;
}

const VideoCall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, mentorId, menteeId, userId } = location.state || {};
  console.log(bookingId,'bookdingId',mentorId,'mentorId',menteeId,'menteeid',userId);
  
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<SessionValidation>({
    isValid: false,
    message: 'Validating session...'
  });

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<any>(null);

  // Validate session time
  const validateSessionTime = (sessionTime: string, sessionDate: string): SessionValidation => {
    const now = new Date();
    console.log(sessionTime, 'sessiontime', sessionDate, 'session data');
    const bb = new Date(sessionDate)
    console.log(bb, 'bb = = = = =', now, 'now = =  == ')
    const sessionDateTime = new Date(sessionDate);
    // const sessionDateTime = new Date(`${sessionDate}T${sessionTime}`);
    const timeDiff = Math.abs(now.getTime() - sessionDateTime.getTime());
    const minutesDiff = Math.floor(timeDiff / 1000 / 60);

    // Allow joining 5 minutes before and up to 30 minutes after scheduled time
    if (minutesDiff <= 30 && now >= new Date(sessionDateTime.getTime() - 5 * 60000)) {
      return { isValid: true, message: 'Session is active' };
    } else if (now < sessionDateTime) {
      return {
        isValid: false,
        message: `Session will start at ${sessionTime} on ${sessionDate}`
      };
    } else {
      return {
        isValid: false,
        message: 'Session has expired'
      };
    }
  };

  const cleanup = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop()
      })
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }
    if (socketRef.current) {
      socketRef.current.disconnect()
    }
    setLocalStream(null)
    setRemoteStream(null)
  }

  // Fetch and validate session details
  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await getBookingDetails(bookingId)
        console.log(response, 'booking in validate session')

        const validation = validateSessionTime(response.data.booking.time, response.data.booking.date);
        setSessionStatus(validation);

        // Redirect if session is invalid
        if (!validation.isValid) {
          setTimeout(() => {
            navigate('/dashboard/video-call-users');
          }, 5000);
        }
      } catch (error) {
        setSessionStatus({
          isValid: false,
          message: 'Error validating session'
        });
      }
    };

    validateSession();
    return () => {
      cleanup()
    }
  }, [bookingId]);

  // Initialize WebRTC peer connection
  const initPeerConnection = () => {
    if(peerConnectionRef.current){
      console.log(peerConnectionRef.current,'peercuoonec curre');
      
      peerConnectionRef.current.close()
    }
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        // Add TURN servers for production
      ]
    };

    const pc = new RTCPeerConnection(configuration);

    if (localStream) {
      console.log('if (localStream) {');
      
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      console.log('pc.onicecandidate = (event)');
      
      if (event.candidate && socketRef.current) {
        console.log('event.candidate && socketRef.current');
        
        socketRef.current.emit('ice-candidate', {
          candidate: event.candidate,
          bookingId,
          targetUserId: userId === mentorId ? menteeId : mentorId
        });
      }
    };

    peerConnectionRef.current = pc;
    return pc
  };

  // Initialize media stream and socket connection
  useEffect(() => {
    if (!sessionStatus.isValid) return;

    const init = async () => {
      try {
        cleanup()
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const socket = io('http://localhost:4000', {
          withCredentials:true,
          path: '/messages',
          transports: ['websocket'],
        });
        socketRef.current = socket;

        socket.on('connect',()=>{
          console.log('Socket connected',socket.id);
          
          console.log('Emitting video-join-room');
          
          socket.emit('video-join-room', { bookingId, userId });
          console.log('after emitting video-join-room');
          
        })

        socket.on('video-call-user', async ({ offer }) => {
          console.log('Received call offer');
          const pc = peerConnectionRef.current || initPeerConnection();
          
          await pc.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          socket.emit('call-accepted', {
            answer,
            bookingId,
            targetUserId: userId === mentorId ? menteeId : mentorId
          });
        });

        socket.on('call-accepted', async ({ answer }) => {
          console.log('Call accepted');
          if (peerConnectionRef.current) {
            await peerConnectionRef.current.setRemoteDescription(
              new RTCSessionDescription(answer)
            );
          }
        });

        socket.on('ice-candidate', async ({ candidate }) => {
          console.log('Received ICE candidate');
          if (peerConnectionRef.current) {
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
          }
        });

      } catch (error) {
        console.error('Error initializing video call:', error);
        setSessionStatus({
          isValid: false,
          message: 'Error accessing camera/microphone'
        });
      }
    };

    init();

    return () => {
      cleanup()
    };
  }, [sessionStatus.isValid, bookingId, mentorId, menteeId, userId]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const startCall = async () => {
    if (!sessionStatus.isValid) {
      console.log('not time to start call');
      return
    };

    try {
      console.log('its entered in start call');
      
      if (!peerConnectionRef.current) {
        console.log('its here in not peer connection ref');
        
        initPeerConnection();
      }

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socketRef.current.emit('video-call-user', {
        offer,
        bookingId,
        targetUserId: userId === mentorId ? menteeId : mentorId
      });

      setIsCallStarted(true);
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };
  const handleBack = () => {
    cleanup();
    navigate('/dashboard/video-call-users');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      {/* <Link  to='/dashboard/video-call-users' >
        ← Back to Sessions
      </Link> */}
      <Button onClick={handleBack} className="p-4 inline-block"> ← Back to Sessions</Button>

      {!sessionStatus.isValid ? (
        <Alert severity="warning" className="m-4">
          {sessionStatus.message}
        </Alert>
      ) : (
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg bg-gray-800"
              />
              <p className="absolute bottom-2 left-2 text-white">You</p>
            </div>
            <div className="relative">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-gray-800"
              />
              <p className="absolute bottom-2 left-2 text-white">Remote User</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            {!isCallStarted && (
              <Button
                variant="contained"
                color="primary"
                onClick={startCall}
                disabled={!sessionStatus.isValid}
              >
                Start Call
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default VideoCall;