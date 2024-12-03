import axios from "axios"
import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
  apiKey: import.meta.env.VITE_ASSEMBLYAI_KEY
})

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

export const startRecording = async (meetingId) => {
  console.log(meetingId);
  const response = await axios.post("https://api.videosdk.live/v2/recordings/start", {
    roomId: meetingId,
    config: {
      'layout': {
        'type': 'GRID',
        'priority': 'PIN'
      },
      'mode': 'audio'
    }
  },
    {
      headers: {
        authorization: authToken,
      }
    }
  )
  console.log(response.data);

  return response.data
}

export const stopRecording = async (meetingId) => {

  let audofileUrl;

  const res = await axios.post("https://api.videosdk.live/v2/recordings/end", {
    roomId: meetingId
  },
    {
      headers: {
        authorization: authToken,
      }
    }
  )

  console.log(res.data);

  const response = await axios.get(`https://api.videosdk.live/v2/recordings?roomId=${meetingId}`, {
    headers: {
      authorization: authToken,
      "Content-Type": "application/json",
    }
  })
  console.log('Audio File URL: ', response.data.data[0].file.fileUrl);

  audofileUrl = response.data.data[0].file.fileUrl

  const params = {
    audio: audofileUrl,
    speaker_labels: true
  }

  const transcript = await client.transcripts.transcribe(params)

  if (transcript.status === 'error') {
    console.error(`Transcription failed: ${transcript.error}`)
    process.exit(1)
  }

  console.log(transcript.text)
  return transcript.text
}

export const getDocumenttext = async (meetingTranscript) => {
  try {
    const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
    const modelName = import.meta.env.VITE_AZURE_OPENAI_MODEL_NAME;
    const azureApiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
    const url = `${endpoint}/openai/deployments/${modelName}/chat/completions?api-version=2023-05-15`;
    const headers = {
      'Content-Type': 'application/json',
      'api-key': azureApiKey,
    };

    const systemPrompt = `
  "Please generate a clear, structured, and concise meeting document in Markdown format based on the provided meeting transcription with the following requirements:

Meeting Title – Include the title of the meeting at the top, extracted from the transcription.

Agenda – List the agenda items in bullet points, based on the content of the meeting. Each agenda item should be concise and reflect the topics discussed during the meeting.

Meeting Discussion – For each agenda item, provide detailed bullet points summarizing the key points discussed, based on the transcription. Break down the discussion for each agenda item into relevant details. Do not include personal names or irrelevant information.

Conclusion – Provide a brief conclusion summarizing the key takeaways, decisions made, or actions concluded during the meeting. Ensure the conclusion is clear, actionable, and based on the meeting transcription.

Strictly Do not mention MARKDOWN in the response
   `;

   const data = {
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: meetingTranscript, 
      },
    ],
    temperature: 0.5, 
  };
  const response = await axios.post(url, data, { headers });
      const resultText = response.data.choices[0].message.content.trim();
    return resultText;
  } catch (error) {
    return error
  }
}