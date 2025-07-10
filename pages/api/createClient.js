export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    const apiUrl = process.env.WHMCS_API_URL;
const apiUsername = process.env.WHMCS_API_USERNAME;
const apiPassword = process.env.WHMCS_API_PASSWORD;
const apiAccessKey = process.env.WHMCS_API_ACCESSKEY;

if (!apiUrl || !apiUsername || !apiPassword || !apiAccessKey) {
  return res.status(500).json({ error: 'Missing WHMCS credentials' });
}

    const payload = new URLSearchParams({
      username: apiUsername,
      password: apiPassword,
      accesskey: apiAccessKey,
      action: 'AddClient',
      email: email,
      password2: 'Rq@idahost123',
      firstname: 'New',
      lastname: 'Client',
      country: 'TH',
      responsetype: 'json'
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const data = await response.json();
    console.log('WHMCS API Response:', data);

    if (data.result !== 'success') {
      return res.status(500).json({ error: 'WHMCS API error', details: data });
    }

    return res.status(200).json({ message: 'Client created successfully', details: data });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
