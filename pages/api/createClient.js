export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📥 Incoming request body:', req.body);

    const { email } = req.body;

    const apiUrl = process.env.WHMCS_API_URL;
    const identifier = process.env.WHMCS_API_IDENTIFIER;
    const secret = process.env.WHMCS_API_SECRET;

    if (!apiUrl || !identifier || !secret) {
      console.error('❌ Missing WHMCS API credentials in environment variables');
      return res.status(500).json({ error: 'Missing WHMCS credentials' });
    }

    // Prepare POST payload with required WHMCS fields
    const payload = new URLSearchParams({
      identifier,
      secret,
      action: 'AddClient',
      username: email,
      email,
      password2: 'R@pidaHost123', // หรือรับจาก req.body ก็ได้
      firstname: 'New',
      lastname: 'Client',
      country: 'TH',
      responseType: 'json',
    });

    // Send POST request to WHMCS
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const data = await response.json();
    console.log('📤 WHMCS API Response:', data);

    if (!response.ok || data.result !== 'success') {
      return res.status(500).json({ error: 'WHMCS API error', details: data });
    }

    return res.status(200).json({ message: 'Client created successfully', clientId: data.clientid });

  } catch (err) {
    console.error('❌ Server error in /api/createClient:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
