import { useMeeting } from '@videosdk.live/react-sdk';
import { Disc2, Mic, MicOff, MonitorOff, MonitorPlay, PhoneOff, Square, Video, VideoOff } from 'lucide-react';
import React, { useState } from 'react';
import { getDocumenttext, startRecording, stopRecording } from '../../utils/Api';
import { useAudioRecording } from '../../hooks/useAudioRecording';
import pdfWriter from '../../utils/pdfWriter';

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
  } = useMeeting();

  const { isRecording, isLoading, error, toggleRecording, meetingTranscript } = useAudioRecording({ meetingId });
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
      toggleScreenShare();
    } catch (error) {
      console.error("Error toggling screen share:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingId)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((error) => {
        console.error('Failed to copy Meeting ID:', error);
      });
  };

  const generateDocument = async () => {
    try {
      const response = await getDocumenttext(meetingTranscript)
      const pdf = pdfWriter(response)
      pdf.save('meeting-minutes.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error);  
    }
  }

  return (
    <div className="bg-[#2d1a44] self-center text-white rounded-xl py-2 sm:py-4 flex flex-col sm:flex-row items-center justify-between px-3 sm:px-6 my-3 sm:my-6 gap-4 sm:gap-16 shadow-[10px_10px_10px_rgba(0,0,0,0.6)] w-full max-w-7xl mx-auto">
      <button
        onClick={handleCopy}
        className="flex items-center justify-center p-2 bg-[#46306e] rounded-xl text-sm sm:text-base w-full sm:w-auto">
        {copied ? "Copied!!" : `Meeting Id: ${meetingId}`}
      </button>

      <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-16">
        <button onClick={handleMicToggle} className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 bg-[#46306e] rounded-full">
          {localMicOn ? <MicOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mic className="h-4 w-4 sm:h-5 sm:w-5" />}
        </button>
        <button onClick={handleWebcamToggle} className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 bg-[#46306e] rounded-full">
          {localWebcamOn ? <VideoOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Video className="h-4 w-4 sm:h-5 sm:w-5" />}
        </button>
        <button
          onClick={toggleRecording}
          disabled={isLoading}
          className={`flex items-center justify-center h-8 w-8 bg-[#46306e] sm:h-10 sm:w-10 rounded-full transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          title={error || ''}
        >
          {isRecording ? (
            <Square className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
          ) : (
            <Disc2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
          )}
        </button>

        <button onClick={handleScreenShare} className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 bg-[#46306e] rounded-full">
          {presenterId ? <MonitorOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <MonitorPlay className="h-4 w-4 sm:h-5 sm:w-5" />}
        </button>
        <button onClick={() => leave()} className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 bg-[#46306e] rounded-full">
          <PhoneOff className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <button onClick={generateDocument} className="flex items-center justify-center p-2 bg-[#46306e] rounded-xl text-sm sm:text-base w-full sm:w-auto">
        Generate Document
      </button>
    </div>
  );
};

export default ControlBar;