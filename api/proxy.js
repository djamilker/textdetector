export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const backendResponse = await fetch('https://text-detector-api.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const text = await backendResponse.text(); // read response as raw text first

    try {
      const json = JSON.parse(text); // attempt to parse it
      res.status(backendResponse.status).json(json);
    } catch (err) {
      res.status(backendResponse.status).json({ error: 'Invalid JSON from backend', raw: text });
    }

  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy request failed', details: err.message });
  }
}
