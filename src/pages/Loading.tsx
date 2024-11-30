import { Video } from 'lucide-react'
import React from 'react'

const Loading = ({meetingId,participants}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
    <Video className="w-16 h-16 text-[#2b0d54] mb-8 animate-bounce" />
    <h3 className="text-xl font-semibold text-[#2b0d54] mb-4">
      Meeting ID: {meetingId}
    </h3>
    {/* <h3 className="text-xl font-semibold text-[#2b0d54] mb-4">
      Participants: {participants}
    </h3> */}
    <div className="flex items-center space-x-3">
      <div className="w-3 h-3 bg-[#2b0d54] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-3 h-3 bg-[#2b0d54] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-3 h-3 bg-[#2b0d54] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
    <p className="text-[#2b0d54] mt-4">Joining the meeting...</p>
  </div>
  )
}

export default Loading
