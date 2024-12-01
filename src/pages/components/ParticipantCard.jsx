import React, { useEffect, useMemo, useRef } from 'react'
import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import { Mic, MicOff, MonitorUp, User, Video, VideoOff } from 'lucide-react';

const ParticipantCard = ({ participantId }) => {
    const micRef = useRef(null)
    const {
        webcamStream,
        webcamOn,
        micStream,
        micOn,
        screenShareStream,
        screenShareOn,
        isLocal,
        displayName
    } = useParticipant(participantId)

    const { presenterId } = useMeeting()

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream()
            mediaStream.addTrack(webcamStream.track)
            return mediaStream
        }
    })

    const screenStream = useMemo(() => {
        if (screenShareOn && screenShareStream) {
            const mediaStream = new MediaStream()
            mediaStream.addTrack(screenShareStream.track)
            return mediaStream
        }
    })

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
        <div className='w-96  bg-[#46306e] text-white rounded-xl shadow-[10px_10px_10px_rgba(0,0,0,0.6)] p-2'>
            <div className='aspect-video rounded-xl'>
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
                        onError={(err) => console.log(err, "screen share video error")}
                    />
                ) : (
                    <div className='flex h-full items-center justify-center'>
                        <User className='text-[#2b0d54] h-24 w-24' />
                    </div>
                )}
            </div>
            <div className='flex items-center justify-between my-4 px-4'>
                <div className='text-white bg-[#6a2f99] px-4 py-2 rounded-xl shadow-lg'>
                    UserNAME
                </div>
                <div className='flex items-center gap-4'>
                    {micOn ? (
                        <Mic className="w-6 h-6 text-[#914cf3]" />
                    ) : (
                        <MicOff className="w-6 h-6 text-red-500" />
                    )}
                    {webcamOn ? (
                        <Video className="w-6 h-6 text-[#914cf3]" />
                    ) : (
                        <VideoOff className="w-6 h-6 text-red-500" />
                    )}
                    {isScreenSharing && (
                        <MonitorUp className="w-6 h-6 text-[#914cf3]" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ParticipantCard
