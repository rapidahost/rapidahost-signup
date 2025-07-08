export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📥 Incoming request:', req.body);

    const { email } = req.body;

    const apiUrl = process.env.WHMCS_API_URL;
    const identifier = process.env.WHMCS_API_IDENTIFIER;
    const secret = process.env.WHMCS_API_SECRET;

    if (!apiUrl || !identifier || !secret) {
      console.error('❌ Missing WHMCS API credentials');
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
      responsetype: 'json' // ต้องเป็นตัวเล็กทั้งหมด
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'WHMCS ' + Buffer.from(`${identifier}:${secret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const raw = await response.text();

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error('❌ WHMCS returned non-JSON:', raw);
      return res.status(500).json({ error: 'WHMCS did not return valid JSON', raw });
    }

    console.log('✅ WHMCS API response:', data);

    if (!response.ok || data.result !== 'success') {
      return res.status(500).json({ error: 'WHMCS API error', details: data });
    }

    return res.status(200).json({ message: 'Client created successfully', clientId: data.clientid });
  } catch (err) {
    console.error('❌ Unexpected error in /api/createClient:', err);
    return res.status(500).json({ error: 'Unexpected server error', details: err.message });
  }
}
