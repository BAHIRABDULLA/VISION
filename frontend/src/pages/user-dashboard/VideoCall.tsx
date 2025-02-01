import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Card, CardContent, Button, Alert, AlertTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowBigLeftIcon } from 'lucide-react';

import { getBookingDetails } from '@/services/mentorApi';

interface SessionValidation {
  isValid: boolean;
  message: string;
}

const VideoCall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, mentorId, menteeId, userId } = location.state || {};
  console.log(bookingId, 'bookdingId', mentorId, 'mentorId', menteeId, 'menteeid', userId);

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
    if (peerConnectionRef.current) {
      console.log(peerConnectionRef.current, 'peercuoonec curre');

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

        const socket = io('http://localhost:4000/messages/video', {
          withCredentials: true,
          // path: '',
          transports: ['websocket', 'polling'],
        });
        socketRef.current = socket;

        socket.on('connect', () => {
          console.log('Socket connected', socket.id);

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
    if (!sessionStatus.isValid) return;

    try {
      const pc = peerConnectionRef.current || initPeerConnection();

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

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
  const [isLocalMainVideo, setIsLocalMainVideo] = useState(false);

  const swapVideos = () => {
    setIsLocalMainVideo(!isLocalMainVideo);
  };

  const handleBack = () => {
    cleanup();
    navigate('/dashboard/video-call-users');
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <div className="p-4">
        <Button
          onClick={handleBack}
          className="flex items-center gap-2"
          variant="contained"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sessions
        </Button>
      </div>

      {!sessionStatus.isValid ? (
        <Alert className="m-4">
          <AlertTitle>{sessionStatus.message}</AlertTitle>
        </Alert>
      ) : (
        <CardContent className="p-6">
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {/* Main Video */}
            <video
              ref={isLocalMainVideo ? localVideoRef : remoteVideoRef}
              autoPlay
              playsInline
              muted={isLocalMainVideo}
              className="w-full h-full object-cover"
            />

            {/* PiP Video */}
            <div className="absolute top-4 right-4 w-1/4 aspect-video">
              <video
                ref={isLocalMainVideo ? remoteVideoRef : localVideoRef}
                autoPlay
                playsInline
                muted={!isLocalMainVideo}
                className="w-full h-full object-cover rounded-lg border-2 border-white/20 shadow-lg"
              />

              {/* Swap Button */}
              <Button
                onClick={swapVideos}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-900/80 hover:bg-gray-900 p-2 h-8 w-8"
                size="small"
              >
                <ArrowBigLeftIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Video Labels */}
            <div className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {isLocalMainVideo ? 'You' : 'Remote User'}
            </div>
            <div className="absolute top-5 right-5 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {isLocalMainVideo ? 'Remote User' : 'You'}
            </div>
          </div>

          {/* Call Controls */}
          <div className="mt-6 flex justify-center">
            {!isCallStarted && (
              <Button
                onClick={startCall}
                disabled={!sessionStatus.isValid}
                className="bg-purple-600 hover:bg-purple-700"
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