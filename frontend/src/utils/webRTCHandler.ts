import { io } from 'socket.io-client'

const socket = io('https://apivision.bahirabdulla.online', {
    withCredentials: true,
    path: '/messages',
    transports: ['websocket', 'polling']
})

export let localStream: MediaStream | null = null
let peerConnection: RTCPeerConnection | null = null

const roomId = 'example_room'

const servers = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}

async function initMedia() {
    try {
        
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        const videoElement = document.getElementById('localVideo') as HTMLVideoElement
        videoElement.srcObject = localStream
    } catch (error) {
        console.error('Failed to access media devices', error);
    }
}

function startCall() {
    
    peerConnection = new RTCPeerConnection(servers)
    if(localStream){

        localStream.getTracks().forEach((track) => peerConnection?.addTrack(track, localStream))
    }

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('candidate', { roomId, candidate: event.candidate })
        }
    }

    peerConnection.ontrack = (event) => {
        const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement
        remoteVideo.srcObject = event.streams[0]
    }
}

async function handleOffer(offer: RTCSessionDescriptionInit) {
    
    if (!peerConnection) startCall();
    await peerConnection!.setRemoteDescription(offer)
    const answer = await peerConnection!.createAnswer()
    await peerConnection!.setLocalDescription(answer)

    socket.emit('answer',{roomId,answer})

}

async function handleAnswer(answer: RTCSessionDescriptionInit) {
    if (!peerConnection) return;
    await peerConnection.setRemoteDescription(answer)
}

function handleCandidate(candidate: RTCIceCandidateInit) {
    if (!peerConnection) return;
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
}

async function makeCall() {
    if (!peerConnection) startCall();

    const offer = await peerConnection!.createOffer()
    await peerConnection!.setLocalDescription(offer)

    socket.emit('offer', { roomId, offer })
}


function stopCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null
    }
    if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        localStream = null
        const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
        const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement

        if(localVideo) localVideo.srcObject = null
        if(remoteVideo) remoteVideo.srcObject = null
    }
}

export { initMedia, handleOffer, handleAnswer, handleCandidate, makeCall , stopCall }