export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Incoming request:', req.body); // ✅ Debug input

    const { email } = req.body;
    // 🔑 ตรวจสอบว่าคุณได้ใช้ process.env.WHMCS_API_* ครบหรือไม่
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
      password2: 'R@pidaHost123', // หรือจะส่งผ่าน req.body ก็ได้
      firstname: 'New',
      lastname: 'Client',
      country: 'TH',
      responseType: 'json',
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'WHMCS ' + Buffer.from(`${identifier}:${secret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const data = await response.json();
    console.log('WHMCS API Response:', data);

    if (!response.ok || data.result !== 'success') {
      return res.status(500).json({ error: 'WHMCS API error', details: data });
    }

    return res.status(200).json({ message: 'Client created successfully' });
  } catch (err) {
    console.error('❌ Server error in /api/createClient:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}

