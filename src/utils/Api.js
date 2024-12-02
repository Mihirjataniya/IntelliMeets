import axios from "axios"


export const authToken = import.meta.env.VITE_APP_VIDEOSDK_TOKEN;

export const createMeeting = async () => {
    const response = await axios.post("https://api.videosdk.live/v2/rooms", {}, {
        headers: {
            authorization: authToken,
        }
    })

    const { roomId } = await response.data
    return roomId
}

export const startRecording = async ( meetingId ) => {
    console.log(meetingId);
    const response = await axios.post("https://api.videosdk.live/v2/recordings/start", {
        roomId: meetingId
    },
        {
            headers: {
                authorization: authToken,
            }
        }
    )
    return response.data
}

export const stopRecording = async ( meetingId ) => {
    console.log(meetingId);

    const response = await axios.post("https://api.videosdk.live/v2/recordings/end", {
        roomId: meetingId
    },
        {
            headers: {
                authorization: authToken,
            }
        }
    )
    return response.data
}