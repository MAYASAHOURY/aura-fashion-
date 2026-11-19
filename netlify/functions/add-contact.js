// Netlify serverless function — adds a new user to Brevo contact list
// Called by login.html on successful signup. API key stays server-side only.
const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: 'Invalid JSON' }; }

  const { email, name } = body;
  if (!email) return { statusCode: 400, body: 'Email required' };

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { statusCode: 500, body: 'Server misconfigured' };

  const payload = JSON.stringify({
    email,
    attributes: { FIRSTNAME: name || '' },
    listIds: [3],
    updateEnabled: true
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.brevo.com',
      path: '/v3/contacts',
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      resolve({ statusCode: res.statusCode < 300 ? 200 : res.statusCode, body: 'OK' });
    });
    req.on('error', () => resolve({ statusCode: 500, body: 'Brevo API error' }));
    req.write(payload);
    req.end();
  });
};
