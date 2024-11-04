import React, { useState } from 'react';
import "./Texttranslate.css";
import Howitworks from "./Howitworks.js";
import Faq from './Faq.js'
import Footer from './Footer.js'
import Headline from './Headline.js'


const Texttranslate = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Default source language
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default target language

  const content=[
    {title:"Select Source and Target Languages",desc:"Choose the language of the text you want to translate and the language you wish to translate it into."}
  ,{title:"Enter or Speak Your Text",desc:"Type your text directly into the app or use the voice input feature to dictate what you want to translate."}
  ,{title:"Receive Instant Translation",desc:"Get your translated text in real-time, ready to share or use in your conversation!"}
]

  const handleTranslate = async () => {
    try {
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sourceText,sourceLanguage, targetLanguage }), // Ensure this sends the correct data
      });
  
      const data = await response.json();
      if (response.ok) {
        setTranslatedText(data.translatedText);
      } else {
        console.error('Translation error:', data.error);
      }
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };
  

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDelete = () => {
    setSourceText('');
    setTranslatedText('');
  };

  return (
    <>
    <Headline/>
    
    <div className="language-selection-container">
      
      <div className="language-box">
       <div className="together"><h3>Input Language</h3>
        <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
        </select>
        </div>
       
      <textarea id="message"  value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          rows="10" 
          class="block p-2.5 w-full text-sm  rounded-lg border " placeholder="Enter your text to translate"></textarea>
        <div className="button-container">
          <button onClick={handleTranslate} style={{display:"flex",
    margin:'auto',
    justifyContent:"space-evenly"}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clip-rule="evenodd" />
</svg>

            Translate</button>
         
          <button onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#98c1d9" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>


          </button>
        </div>
      </div>

      <div className="language-box">
      <div className="together"><h3>Output Language</h3>
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          <option value="zh">Chinese</option>
        </select>
        </div>

           <textarea id="message"  
           placeholder="Translated text will appear here"
           value={translatedText}
          rows="10" 
          class="block p-2.5 w-full text-sm  rounded-lg border " ></textarea>
       
        <div className="button-container">
          <button onClick={() => handleCopy(translatedText)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#98c1d9" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
</svg>

          </button>
        </div>
      </div>
    </div>
    <Howitworks content={content} />
    <Faq/>
    <Footer/>
    </>
  );
};

Howitworks.defaultProps = {
  content: []
};


export default Texttranslate;
