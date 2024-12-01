import React, { useEffect, useState } from 'react'
import { useMeeting } from '@videosdk.live/react-sdk';
import Loading from './Loading';
import ParticipantCard from './components/ParticipantCard';
import { MicIcon } from 'lucide-react';
import ControlBar from './components/ControlBar';

const MeetingScreen = ({meetingId,OnLeaveMeeting}) => {
  
    const [loading,setLoading] = useState(true)

    const { join , participants , presenterId } = useMeeting({
        onMeetingJoined : () => setLoading(false),
        onMeetingLeft : () => OnLeaveMeeting()
    })

    const hasScreenShare = !!presenterId;

    useEffect(()=>{
        join()
    },[])
    
    if(loading){
        return <Loading meetingId={meetingId}  />
    }
  return (
    <div className='min-h-screen w-full flex flex-col px-6'>
      {/* Main Video Grid */}
      <div className='flex-grow p-4'>
        <div className='grid grid-cols-1 s xl:grid-cols-4 gap-4'>
          {[...participants.keys()].map((participantId) => (
            <div key={participantId} className='flex justify-center'>
              <ParticipantCard participantId={participantId} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar (controls, etc.) */}
     
      <ControlBar meetingId={meetingId}/>
    </div>
  )
}

export default MeetingScreen
