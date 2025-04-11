export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const backendResponse = await fetch('https://text-detector-api.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await backendResponse.json();
    res.status(backendResponse.status).json(data);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
