import React, { useState, useEffect, useMemo } from 'react';
import './Speech2text.css';
import Howitworks from './Howitworks.js';
import Faq from './Faq.js'
import Footer from './Footer.js'

const Speech2text = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const recognition = useMemo(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = true;
    return recog;
  }, []);

  const speechToTextContent = [
    {
        title: "Choose Your Language",
        desc: "Select the language you’ll be speaking for accurate transcription."
    },
    {
        title: "Speak Clearly into the App",
        desc: "Use your device's microphone to capture your speech. The app listens and processes your words."
    },
    {
        title: "View Transcribed Text",
        desc: "Instantly see your spoken words converted into written text, ready for editing or sharing."
    }
];


  const handleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setText((prevText) => prevText + finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  }, [recognition]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () => alert('Text copied to clipboard!'),
      (err) => alert('Failed to copy text')
    );
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'transcription.txt'; // Set the filename
    document.body.appendChild(element); // Append to the body
    element.click(); // Trigger the download
    document.body.removeChild(element); // Clean up
  };

  return (
    <>
    <div className="speech-container">
      <div style={{display:'flex',justifyContent:'space-around'}}>
      <h2 style={{ display: 'flex', alignItems: 'center' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange"
       style={{ width: '35px', height: '35px', marginRight: '8px' }} class="size-6">
  <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
  <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
</svg>

        
        <b>Speech to Text</b></h2>
      </div>
      <textarea
        placeholder="Start speaking or type manually..."
        value={text}
        onChange={handleTextChange}
        rows="10"
        cols="50"
        className="speech-textarea"
      />

      <div className="button-container">
        <button onClick={handleListening} className="speech-button" style={{"display":"flex","justifyContent":"space-around" }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
</svg>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        
        <button onClick={handleClear} className="speech-button clear-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

        </button>

        <button onClick={handleCopy} className="speech-button copy-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
</svg>

        </button>

         {/* Download Button */}
         <button onClick={handleDownload} className="speech-button download-button">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

          </button>
      </div>
    </div>
<Howitworks content={speechToTextContent}/>
<Faq/>
<Footer/>
    </>
  );
};

Howitworks.defaultProps = {
  content: []
};


export default Speech2text;
