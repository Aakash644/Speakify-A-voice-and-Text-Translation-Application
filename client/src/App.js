import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Button from 'react-bootstrap/Button';
import NavBar from "./Components/Navigation.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Speech_2_text from "./Components/Speech2text.js";
import Text_2_speech from "./Components/Text2speech.js";
import Text_transcribe from "./Components/Transcribe.js";
import Text_translate from "./Components/Texttranslate.js";
import Home from "./Components/Home.js";
import Hero from "./Components/Hero.js";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // Fetch items when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddItem = () => {
    axios.post('http://localhost:5000/api/items', { name })
      .then(res => setItems([...items, res.data]))
      .catch(err => console.error(err));
    setName('');
  };

  return (
<>
<Router>
      <div>
        {/* Define the routes */}
        <NavBar/>
        <Routes>
        <Route path="/" element={<Home />} /> {/* Root/Home page */};
          <Route path="/Text_2_speech" element={<Text_2_speech />} /> {/* Root/Home page */}
          <Route path="/Speech_2_text" element={<Speech_2_text />} /> {/* About page */}
          {/* <Route path="/Text_transcribe" element={<Text_transcribe />} /> About page */}
          <Route path="/Text_translate" element={<Text_translate />} /> {/* Contact page */}
        
        </Routes>
      </div>
    </Router>


  
    </>
  );
}

export default App;

