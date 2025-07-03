export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    firstname,
    lastname,
    email,
    phonenumber,
    firebase_uid,
  } = req.body;

  const identifier = process.env.WHMCS_API_IDENTIFIER;
  const secret = process.env.WHMCS_API_SECRET;
  const whmcsUrl = process.env.WHMCS_API_URL;

  if (!identifier || !secret || !whmcsUrl) {
    console.error("🚨 Missing WHMCS ENV variables");
    return res.status(500).json({ error: 'WHMCS API credentials missing in .env' });
  }

  try {
    const params = new URLSearchParams({
      action: 'AddClient',
      username: identifier,
      password: secret,
      responsetype: 'json',
      firstname,
      lastname,
      email,
      password: 'Random1234', // หรือจะใช้ password ที่ user ป้อนเข้ามาก็ได้
      phonenumber,
      'customfields[firebase_uid]': firebase_uid,
    });

    // 🔍 Log debug
    console.log("📤 Sending to WHMCS API:", whmcsUrl);
    console.log("📤 Params:", params.toString());

    const response = await fetch(whmcsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();
    console.log("📥 WHMCS Response:", data);

    if (data.result === 'success') {
      return res.status(200).json({ message: 'WHMCS client created successfully' });
    } else {
      return res.status(400).json({ error: data.message || 'WHMCS API error' });
    }
  } catch (error) {
    console.error("🔥 WHMCS API Call Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
