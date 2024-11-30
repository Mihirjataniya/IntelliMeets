import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { authToken, createMeeting } from '../utils/Api'
import Joinscreen from './Joinscreen'
import { MeetingProvider } from '@videosdk.live/react-sdk';
import MeetingScreen from './MeetingScreen';

const Meeting = () => {
  const [meetingId,setMeetingId] = useState()

  const getMeetingId = async (id) => {
    const meetingId = id || await createMeeting()
    setMeetingId(meetingId)
  }
  
  const OnLeaveMeeting = () => {
    setMeetingId(null)
  }
  useEffect(()=>{
    console.log(meetingId); 
  },[meetingId])
  return (
   <Layout>
    {meetingId ? (
        <MeetingProvider 
        config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            multiStream: true,
          }}
         token = {authToken}
          >
        <MeetingScreen
            meetingId={meetingId}
            OnLeaveMeeting={OnLeaveMeeting}
        />
        </MeetingProvider>
    )
        :
        <Joinscreen getMeetingId={getMeetingId} />
    }
    
   </Layout>
  )
}

export default Meeting
