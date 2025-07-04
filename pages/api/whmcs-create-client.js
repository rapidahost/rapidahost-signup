import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    firstname,
    lastname,
    email,
    phonenumber,
    firebase_uid
  } = req.body;

  const accessKey = 'PUT_YOUR_ACCESS_KEY_HERE'; // 🔐 WHMCS API Access Key
  const whmcsUrl = 'https://billing.rapidahost.com/includes/api.php';

  const payload = new URLSearchParams({
    action: 'AddClient',
    accesskey: accessKey,
    responsetype: 'json',
    firstname,
    lastname,
    email,
    phonenumber,
    'customfields[firebase_uid]': firebase_uid
  });

  try {
    const response = await axios.post(whmcsUrl, payload.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const data = response.data;

    if (data.result === 'success') {
      return res.status(200).json({
        success: true,
        clientid: data.clientid,
        message: 'WHMCS client created successfully'
      });
    } else {
      return res.status(400).json({
        success: false,
        error: data.message || 'WHMCS API error',
        raw: data
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'WHMCS API Connection Failed',
      details: error.message
    });
  }
}
