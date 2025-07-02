// pages/api/whmcs-create-client.js

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

  try {
    const params = new URLSearchParams({
      action: 'AddClient',
      username: process.env.WHMCS_API_IDENTIFIER,
      password: process.env.WHMCS_API_SECRET, // หรือ WHMCS API Hash
      responsetype: 'json',
      firstname,
      lastname,
      email,
      phonenumber,
      'customfields[firebase_uid]': firebase_uid, // ✅ ใส่ตรงนี้
    });

    const response = await fetch(process.env.WHMCS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.result === 'success') {
      return res.status(200).json({ message: 'WHMCS client created successfully' });
    } else {
      return res.status(400).json({ error: data.message || 'WHMCS API error' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
