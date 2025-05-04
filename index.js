const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post(
      'https://YOUR-N8N-WEBHOOK-URL', // 👈 Replace this with your real webhook
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));