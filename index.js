const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  const targetUrl = req.headers['target-url'];

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing Target-URL header' });
  }

  try {
    const response = await axios.post(targetUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null,
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
