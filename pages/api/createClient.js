export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📩 Incoming request body:', req.body);

    const { email } = req.body;
    const apiUrl = process.env.WHMCS_API_URL;
    const identifier = process.env.WHMCS_API_IDENTIFIER;
    const secret = process.env.WHMCS_API_SECRET;

    if (!apiUrl || !identifier || !secret) {
      console.error('❌ Missing WHMCS API credentials in environment variables');
      return res.status(500).json({ error: 'Missing WHMCS credentials' });
    }

    const payload = new URLSearchParams({
      action: 'AddClient',
      username: email,
      email,
      password2: 'R@pidaHost123',
      firstname: 'New',
      lastname: 'Client',
      country: 'TH',
      responseType: 'json',
    });

    const authHeader = 'WHMCS ' + Buffer.from(`${identifier}:${secret}`).toString('base64');

    console.log('🌐 Sending request to WHMCS API:', apiUrl);
    console.log('🔐 Authorization:', authHeader);
    console.log('📦 Payload:', payload.toString());

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const raw = await response.text();
    console.log('📥 Raw response from WHMCS:', raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (jsonErr) {
      console.error('❌ Failed to parse WHMCS response as JSON:', jsonErr.message);
      return res.status(500).json({ error: 'Invalid JSON from WHMCS', raw });
    }

    console.log('✅ Parsed WHMCS response:', data);

    if (!response.ok || data.result !== 'success') {
      return res.status(500).json({ error: 'WHMCS API error', details: data });
    }

    return res.status(200).json({ message: 'Client created successfully', client: data });
  } catch (err) {
    console.error('💥 Unhandled server error in /api/createClient:', err);
    return res.status(500).json({ error: 'Unhandled server error', details: err.message });
  }
}
