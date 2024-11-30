import axios from "axios"


export const authToken = import.meta.env.VITE_APP_VIDEOSDK_TOKEN;

export const createMeeting = async () => {
   
    
    const response = await axios.post("https://api.videosdk.live/v2/rooms",{},{
       headers:{
        authorization: authToken,
       }
    })
    
    const { roomId } = await response.data
    return roomId
}