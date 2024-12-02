import React, { useEffect, useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import Loading from './Loading';
import ParticipantCard from './components/ParticipantCard';
import ControlBar from './components/ControlBar';

const MeetingScreen = ({ meetingId, OnLeaveMeeting }) => {
  const [loading, setLoading] = useState(true);

  const { join, participants, presenterId } = useMeeting({
    onMeetingJoined: () => setLoading(false),
    onMeetingLeft: () => OnLeaveMeeting(),
  });

  const participantIds = [...participants.keys()];
  const hasScreenShare = !!presenterId;

  useEffect(() => {
    join();
  }, []);

  if (loading) {
    return <Loading meetingId={meetingId} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col px-2 sm:px-4 md:px-12 md:py-6">
  
      <div className="flex-grow p-2 sm:p-4">
        {hasScreenShare ? (
          <div className="grid grid-cols-12 gap-2 md:gap-4">
            {/* Screen Share Takes 9/12 of the grid */}
            <div className="col-span-12 lg:col-span-9 mb-4 lg:mb-0">
              <ParticipantCard 
                participantId={presenterId} 
                isScreenShare={true}
                className="w-full "
              />
            </div>
          
            <div className="col-span-12 lg:col-span-3">
              <div className="grid grid-cols-1 gap-2">
                {participantIds
                  .filter(id => id !== presenterId)
                  .map((participantId) => (
                    <ParticipantCard 
                      key={participantId} 
                      participantId={participantId}
                      className="w-full"
                    />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {participantIds.map((participantId) => (
              <ParticipantCard
                key={participantId} 
                participantId={participantId}
                className="w-full"
              />
            ))}
          </div>
        )}
      </div>
      <ControlBar meetingId={meetingId} />
    </div>
  );
};

export default MeetingScreen;