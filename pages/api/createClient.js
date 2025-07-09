export default async function handler(req, res) {
  // ✅ อนุญาตเฉพาะ POST เท่านั้น
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // ✅ รับค่า email จาก body ที่ถูกส่งมา
    const { email } = req.body;

    // ✅ โหลดค่าจาก .env.local (ฝั่ง server)
    const apiUrl = process.env.WHMCS_API_URL;
    const identifier = process.env.WHMCS_IDENTIFIER;
    const secret = process.env.WHMCS_SECRET;

    if (!apiUrl || !identifier || !secret) {
      console.error('❌ Missing WHMCS credentials in environment variables');
      return res.status(500).json({ error: 'Missing WHMCS credentials' });
    }

    // ✅ เตรียมข้อมูลที่จะส่งไปยัง WHMCS API
    const payload = new URLSearchParams({
      identifier,
      secret,
      action: 'AddClient',
      username: email,
      email: email,
      password2: 'Rq@idahost123',
      firstname: 'New',
      lastname: 'Client',
      country: 'TH',
      responsetype: 'json'
    });

    // ✅ ส่ง POST request ไปยัง WHMCS
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const data = await response.json();
    console.log('WHMCS API Response:', data);

    // ✅ ตรวจสอบผลลัพธ์จาก WHMCS
    if (data.result !== 'success') {
      return res.status(500).json({ error: 'WHMCS API error', details: data });
    }

    return res.status(200).json({ message: 'Client created successfully', details: data });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
