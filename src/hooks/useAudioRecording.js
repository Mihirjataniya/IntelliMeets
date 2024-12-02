import { useCallback, useRef, useState } from "react"
import { startRecording, stopRecording } from "../utils/Api"


export const useAudioRecording = ({ meetingId }) => {

    const [isRecording, setIsRecording] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const toggleRecording = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            if (!isRecording) {
                console.log(meetingId);
                await startRecording(meetingId)
                setIsRecording(true)
            } else {
                await stopRecording(meetingId);
                setIsRecording(false);
            }
        } catch (error) {
            setError('An error occurred with recording');
            setIsRecording(false);
        } finally {
            setIsLoading(false);
        }
    },[meetingId,isRecording])

    return {
        isRecording,
        isLoading,
        error,
        toggleRecording
    }
}