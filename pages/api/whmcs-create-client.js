export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    firstname,
    lastname,
    email,
    password,
    phonenumber,
    firebase_uid,
  } = req.body;

  const identifier = process.env.WHMCS_API_IDENTIFIER;
  const secret = process.env.WHMCS_API_SECRET;
  const whmcsUrl = process.env.WHMCS_API_URL;

  if (!identifier || !secret || !whmcsUrl) {
    console.error("❌ Missing WHMCS credentials in .env");
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
      password,
      phonenumber,
      'customfields[firebase_uid]': firebase_uid,
    });

    // 🔎 Log ค่าที่จะส่งไปยัง WHMCS
    console.log("📤 Sending to WHMCS...");
    console.log("📤 WHMCS URL:", whmcsUrl);
    console.log("📤 Request Params:", params.toString());

    const response = await fetch(whmcsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    // 🔍 Log ค่าที่ได้กลับจาก WHMCS
    console.log("📥 WHMCS Raw Response:", data);

    if (data.result === 'success') {
      return res.status(200).json({ message: 'WHMCS client created successfully' });
    } else {
      return res.status(400).json({
        error: data.message || 'WHMCS API error',
        fullResponse: data, // 🔁 แนบข้อมูลทั้งหมดเพื่อ debug
      });
    }
  } catch (error) {
    console.error("❌ API call failed:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
