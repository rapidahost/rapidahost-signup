// /pages/api/whmcs-create-client.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    firstname,
    lastname,
    email,
    password,
    address1,
    city,
    state,
    postcode,
    country,
    phonenumber,
    firebase_uid, // เพิ่ม uid ที่ส่งมาจาก Firebase
  } = req.body;

  const whmcsUrl = 'https://billing.rapidahost.com/includes/api.php';
  const whmcsApiIdentifier = process.env.WHMCS_API_IDENTIFIER;
  const whmcsApiSecret = process.env.WHMCS_API_SECRET;

  if (!whmcsApiIdentifier || !whmcsApiSecret) {
    return res.status(500).json({ error: 'Missing WHMCS API credentials' });
  }

  const params = new URLSearchParams({
    identifier: whmcsApiIdentifier,
    secret: whmcsApiSecret,
    action: 'AddClient',
    responsetype: 'json',
    firstname,
    lastname,
    email,
    password2: password,
    address1,
    city,
    state,
    postcode,
    country,
    phonenumber,
    'customfields[firebase_uid]': firebase_uid, // <-- ส่งค่า UID ไปที่ custom field
  });

  try {
    const response = await fetch(whmcsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.result === 'success') {
      return res.status(200).json({ success: true, clientid: data.clientid });
    } else {
      return res.status(400).json({
        success: false,
        message: data.message || 'WHMCS API error',
        raw: data,
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: 'WHMCS API Error',
      details: err.message,
    });
  }
}


