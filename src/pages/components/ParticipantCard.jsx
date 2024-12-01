import React, { useEffect, useMemo, useRef } from 'react';
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import { Mic, MicOff, MonitorUp, User, Video, VideoOff } from 'lucide-react';

const ParticipantCard = ({ participantId, isScreenShare = false, className = '' }) => {
  const micRef = useRef(null);
  const {
    webcamStream,
    webcamOn,
    micStream,
    micOn,
    screenShareStream,
    screenShareOn,
    isLocal,
    displayName
  } = useParticipant(participantId);

  const { presenterId } = useMeeting();

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamOn, webcamStream]);

  const screenStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(screenShareStream.track);
      return mediaStream;
    }
  }, [screenShareOn, screenShareStream]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) => console.error("audioElem.current.play() failed", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  const isScreenSharing = presenterId === participantId;

  return (
    <div className={`bg-[#46306e] text-white rounded-xl shadow-[5px_5px_10px_rgba(0,0,0,0.4)] p-2 ${className}`}>
      <div className={`relative rounded-xl overflow-hidden aspect-video ${isScreenShare ? 'aspect-video' : 'aspect-video'}`}>
        {webcamOn && videoStream ? (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            width="100%"
            height="100%"
         
            onError={(err) => console.log(err, "participant video error")}
          />
        ) : isScreenSharing && screenStream ? (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={screenStream}
            width="100%"
            height="100%"
            style={{ aspectRatio: 'auto' }}
            onError={(err) => console.log(err, "screen share video error")}
          />
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center bg-[#2b0d54]">
            <User className="text-white h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between my-2 sm:my-4 px-2 sm:px-4">
        <div className="text-white bg-[#6a2f99] px-2 sm:px-4 py-1 sm:py-2 rounded-xl shadow-lg text-sm sm:text-base">
          {displayName || 'User'}
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {micOn ? (
            <Mic className="w-4 h-4 sm:w-6 sm:h-6 text-[#914cf3]" />
          ) : (
            <MicOff className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
          )}
          {webcamOn ? (
            <Video className="w-4 h-4 sm:w-6 sm:h-6 text-[#914cf3]" />
          ) : (
            <VideoOff className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
          )}
          {isScreenSharing && (
            <MonitorUp className="w-4 h-4 sm:w-6 sm:h-6 text-[#914cf3]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;