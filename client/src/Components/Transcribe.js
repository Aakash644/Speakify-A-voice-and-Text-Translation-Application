import React, { useState } from 'react';
import axios from 'axios';

const Transcript = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [transcript, setTranscript] = useState('');

    const handleFileChange = (event) => {
        setAudioFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('audio', audioFile);

        try {
            const response = await axios.post('http://localhost:5000/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTranscript(response.data.transcript);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Audio Transcription</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="audio/*" onChange={handleFileChange} required />
                <button type="submit">Upload and Transcribe</button>
            </form>
            {transcript && (
                <div>
                    <h2>Transcript</h2>
                    <p>{transcript}</p>
                </div>
            )}
        </div>
    );
};

export default Transcript;
