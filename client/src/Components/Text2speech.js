import React, { useState } from 'react';
import Howitworks from './Howitworks.js'
import Faq from './Faq.js'
import Footer from './Footer.js'

const Text2speech = () => {
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState('Joanna');
  const [audioUrl, setAudioUrl] = useState(null);

  const handleTextChange = (e) => setText(e.target.value);
  const handleVoiceChange = (e) => setVoiceId(e.target.value);

  const textToSpeechContent = [
    {
        title: "Input Your Text",
        desc: "Type or paste the text you want to convert into speech into the app."
    },
    {
        title: "Select Voice and Settings",
        desc: "Choose from a variety of voices and adjust the pitch, speed, and volume to suit your preference."
    },
    {
        title: "Listen to Your Text",
        desc: "Press play to hear your text read aloud in the chosen voice, helping with pronunciation and language learning."
    }
];


  const handleGenerate = async () => {
    try {
      const response = await fetch('http://localhost:5000/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, voiceId }),
      });
      if (!response.ok) throw new Error('Error fetching audio data');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url); // Set the audio URL for playback
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div style={styles.container}>
      <div style={styles.title}>
      <h2 style={{ display: 'flex', alignItems: 'center' }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" 
       style={{ width: '35px', height: '35px', marginRight: '8px' }}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>

  <b>Text to Speech</b></h2>
  </div>
      <textarea
        value={text}
        onChange={handleTextChange}
        rows="10"
        cols="40"
        placeholder="Enter text here"
        style={styles.textarea}
      />
      <br />
      <select onChange={handleVoiceChange} style={styles.select}>
        <option value="Joanna">Joanna (English - US)</option>
        <option value="Matthew">Matthew (English - US)</option>
        <option value="Celine">Celine (French - FR)</option>
        <option value="Mizuki">Mizuki (Japanese - JP)</option>
      </select>
      <br />
      <button onClick={handleGenerate} style={styles.button}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>

        Generate</button>
      {audioUrl && (
        <div style={styles.audioContainer}>
          <audio controls style={styles.audio} src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
    <Howitworks content={textToSpeechContent}/>
    <Faq/>
    <Footer/>
    </>
  );
};

const styles = {
  container: {
    
    backgroundColor: '#f9f9f9',
    margin: '0 auto',
    maxWidth: '600px',
    padding: '20px',
    marginTop:'2%',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  title:{
    
  display:'flex',
  justifyContent:'space-evenly',
  textAlign:'center'
  }
  ,
  textarea: {
    marginBottom: '10px',
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  select: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    display:"flex",
    textAlign:'center',
    margin:'auto',
    justifyContent:"space-around",
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  audioContainer: {
    marginTop: '10px',
  },
  audio: {
    width: '100%', // Optional: make the audio control full width
  },
};

export default Text2speech;
