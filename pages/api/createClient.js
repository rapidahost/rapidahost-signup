export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    const apiUrl = process.env.NEXT_PUBLIC_WHMCS_API_URL;
    const identifier = process.env.NEXT_PUBLIC_WHMCS_IDENTIFIER;
    const secret = process.env.NEXT_PUBLIC_WHMCS_SECRET;

    if (!apiUrl || !identifier || !secret) {
      return res.status(500).json({ error: 'Missing WHMCS credentials' });
    }

    // ✅ WHMCS ต้องการ identifier และ secret ส่งเป็น POST fields
    const payload = new URLSearchParams({
      action: 'AddClient',
      username: email,
      email,
      password2: 'R@pidaHost123',
      firstname: 'New',
      lastname: 'Client',
      country: 'TH',
      identifier, // ✅ ต้องอยู่ตรงนี้
      secret,     // ✅ ต้องอยู่ตรงนี้
      responsetype: 'json',
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
