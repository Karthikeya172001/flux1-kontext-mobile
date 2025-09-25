const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL_URL = 'https://api-inference.huggingface.co/models/black-forest-labs/flux-1-kontext-dev';

app.post('/edit-image', async (req, res) => {
    const { prompt, imageBase64 } = req.body;

    try {
        const response = await fetch(MODEL_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HF_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: { prompt, image: imageBase64 } })
        });

        const data = await response.json();
        res.json({ editedImage: data }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
