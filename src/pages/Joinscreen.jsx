import React, { useState } from 'react';
import { Video, Users } from 'lucide-react';  // Make sure this import matches your version

const Joinscreen = ({ getMeetingId }) => {
    const [meetingId,setMeetingId] = useState('')
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <div className="bg-[#46306e] text-white rounded-xl shadow-[10px_10px_10px_rgba(0,0,0,0.6)] p-6 w-96">
                <h1 className='text-4xl font-bold'>IntelliMeets</h1>
                <div className='flex flex-col items-center justify-center w-full my-5'>
                    <div className='flex items-center justify-center w-full gap-3 my-2'>
                        <div className='h-1 bg-white w-full rounded-xl'></div>
                        <div className='text-2xl font-bold text-nowrap'>Video Conference</div>
                        <div className='h-1 bg-white w-full rounded-xl'></div>
                    </div>
                    <div className='w-full mt-4 flex flex-col gap-2'>
                        <input 
                        onChange={(e)=>{
                            setMeetingId(e.target.value)
                        }} 
                        type='text' 
                        className='w-full bg-[#53387b] p-2 outline-none rounded-lg shadow-[0px_3px_2px_rgba(0,0,0,0.6),0px_4px_6px_rgba(0,0,0,0.4)] placeholder:text-gray-500' placeholder='Enter Meeting ID' />
                        <button
                         onClick={()=>{
                            getMeetingId(meetingId)
                         }}
                         className='bg-[#9b88d7] w-full my-2 p-2 rounded-xl text-[#2b0d54] font-bold hover:scale-95 flex items-center  justify-center gap-4'> 
                            <Users /> Join Meeting
                        </button>
                    </div>
                    <div className='flex items-center justify-center w-full gap-3 my-2'>
                        <div className='h-0.5 bg-gray-500 w-full rounded-xl'></div>
                        <div className='text-xs text-gray-500 font-bold text-nowrap'>OR</div>
                        <div className='h-0.5 bg-gray-500 w-full rounded-xl'></div>
                    </div>
                    <button
                    onClick={()=>{
                        getMeetingId(null)
                    }}
                    className='bg-[#9b88d7] w-full my-2 p-2 rounded-xl text-[#2b0d54] font-bold hover:scale-95 flex items-center  justify-center gap-4'>
                        <Video /> Create Meeting
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Joinscreen;
