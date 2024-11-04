const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();
const axios = require('axios');
const multer = require('multer');
app.use(express.json());
app.use(cors());


// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies


// AWS SDK Configuration
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,  // Replace with your Access Key
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,  // Replace with your Secret Key
  region:"us-east-1"  // Replace with your AWS Region
});


// Translation endpoint
app.post('/translate', (req, res) => {
  const { sourceText, sourceLanguage,targetLanguage } = req.body;

  // Create a Translate service object
  const translate = new AWS.Translate();

  // Parameters for the translation request
  const params = {
    Text: sourceText, // Ensure you provide the 'Text' parameter
    TargetLanguageCode: targetLanguage,
    SourceLanguageCode: sourceLanguage
  };

  // Call the translateText function from the AWS SDK
  translate.translateText(params, (err, data) => {
    if (err) {
      console.error('Error translating text:', err);
      return res.status(500).json({ error: 'Translation failed' });
    }
    res.json({ translatedText: data.TranslatedText });
  });
});


const polly = new AWS.Polly();

app.post('/synthesize', async (req, res) => {
  const { text, voiceId } = req.body;

  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: voiceId || 'Joanna', // Default to Joanna if no voiceId provided
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="speech.mp3"',
    });
    res.send(data.AudioStream);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).json({ error: 'Error synthesizing speech' });
  }
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

