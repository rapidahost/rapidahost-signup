export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstname, lastname, email, password } = req.body;

    // อ่านค่า Env แบบฝั่ง Server เท่านั้น
    const apiUrl = process.env.WHMCS_API_URL;
    const identifier = process.env.WHMCS_API_IDENTIFIER;
    const secret = process.env.WHMCS_API_SECRET;

    if (!apiUrl || !identifier || !secret) {
      console.error('Missing WHMCS credentials');
      return res.status(500).json({ error: 'Missing WHMCS credentials in environment variables' });
    }

    const payload = new URLSearchParams({
      identifier,
      secret,
      action: 'AddClient',
      firstname,
      lastname,
      email,
      password2: password,
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

    if (data.result !== 'success') {
      return res.status(500).json({ error: 'WHMCS API error', details: data });
    }

    return res.status(200).json({ message: 'Client created successfully', details: data });

  } catch (error) {
    console.error('API call failed:', error);
    return res.status(500).json({ error: 'Internal server error', detail: error.message });
  }
}
