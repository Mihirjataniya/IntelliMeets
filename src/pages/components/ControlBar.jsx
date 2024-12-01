import { useMeeting } from '@videosdk.live/react-sdk'
import { Mic, MicIcon, MicOff, MonitorOff, MonitorPlay, PhoneOff, Video, VideoOff } from 'lucide-react';
import React, { useState } from 'react'

const ControlBar = ({ meetingId }) => {
    const [copied, setCopied] = useState(false);
    const {
        leave,
        toggleMic,
        toggleWebcam,
        localMicOn,
        localWebcamOn,
        toggleScreenShare,
        presenterId
    } = useMeeting()

    const handleMicToggle = () => {
        try {
            toggleMic();
        } catch (error) {
            console.error("Error toggling microphone:", error);
        }
    };

    const handleWebcamToggle = () => {
        try {
            toggleWebcam();
        } catch (error) {
            console.error("Error toggling webcam:", error);
        }
    };

    const handleScreenShare = async () => {
        try {
            toggleScreenShare()
        } catch (error) {
            console.error("Error toggling webcam:", error);
        }
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(meetingId)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000); // Hide "Copied!" message after 2 seconds
            })
            .catch((error) => {
                console.error('Failed to copy Meeting ID:', error);
            });
    };
    return (
        <div className='bg-[#2d1a44]  self-center text-white rounded-xl  py-4 flex items-center justify-between px-6 my-6 gap-16 shadow-[10px_10px_10px_rgba(0,0,0,0.6)]'>
            <button
                onClick={handleCopy}
                className='flex items-center justify-center p-2 bg-[#46306e] rounded-xl'>
                {copied ? "Copied!!" : `Meeting Id: ${meetingId}`}
            </button>
            <div className='flex items-center justify-between gap-16'>
                <button onClick={handleMicToggle} className='flex items-center justify-center h-10 w-10 bg-[#46306e] rounded-full'>
                    {localMicOn ? <MicOff /> : <Mic />}
                </button>
                <button onClick={handleWebcamToggle} className='flex items-center justify-center h-10 w-10 bg-[#46306e] rounded-full'>
                    {localWebcamOn ? <VideoOff /> : <Video />}
                </button>
                <button onClick={handleScreenShare} className='flex items-center justify-center h-10 w-10 bg-[#46306e] rounded-full'>
                    {presenterId ? <MonitorOff /> : <MonitorPlay />}
                </button>
                <button onClick={() => leave()} className='flex items-center justify-center h-10 w-10 bg-[#46306e] rounded-full'>
                    <PhoneOff />
                </button>
            </div>
            <button className='flex items-center justify-center p-2 bg-[#46306e] rounded-xl'>
                Generate Document
            </button>
        </div>
    )
}

export default ControlBar
