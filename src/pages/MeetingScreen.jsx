import React, { useEffect, useState } from 'react'
import { useMeeting } from '@videosdk.live/react-sdk';
import Loading from './Loading';

const MeetingScreen = ({meetingId,OnLeaveMeeting}) => {
  
    const [loading,setLoading] = useState(true)

    const { join,participants } = useMeeting({
        onMeetingJoined : () => setLoading(false),
        onMeetingLeft : () => OnLeaveMeeting()
    })

    useEffect(()=>{
        join()
    },[])
    
    if(loading){
        return <Loading meetingId={meetingId}  />
    }
  return (
    <div className='h-full w-full'>
      Meeting ID : {meetingId}
    </div>
  )
}

export default MeetingScreen
