// pages/api/whmcs-create-client.js

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
  } = req.body;

  const whmcsUrl = 'https://billing.rapidahost.com/includes/api.php';
  const whmcsApiIdentifier = process.env.WHMCS_API_IDENTIFIER;
  const whmcsApiSecret = process.env.WHMCS_API_SECRET;

  if (!whmcsApiIdentifier || !whmcsApiSecret) {
    return res.status(500).json({ error: 'Missing WHMCS API credentials' });
  }

  const baseParams = {
    identifier: whmcsApiIdentifier,
    secret: whmcsApiSecret,
    responsetype: 'json',
  };

  // 1. ตรวจสอบว่า email นี้มี client อยู่แล้วหรือไม่
  const checkParams = new URLSearchParams({
    ...baseParams,
    action: 'GetClientsDetails',
    email,
    stats: 'false',
  });

  try {
    const checkRes = await fetch(whmcsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: checkParams.toString(),
    });

    const checkData = await checkRes.json();

    if (checkData.result === 'success' && checkData.clientid) {
      return res.status(400).json({ success: false, message: 'Client already exists in WHMCS' });
    }

    // 2. ถ้ายังไม่มี client → AddClient
    const createParams = new URLSearchParams({
      ...baseParams,
      action: 'AddClient',
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
    });

    const createRes = await fetch(whmcsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: createParams.toString(),
    });

    const createData = await createRes.json();

    if (createData.result === 'success') {
      return res.status(200).json({ success: true, clientid: createData.clientid });
    } else {
      return res.status(400).json({
        success: false,
        message: createData.message || 'WHMCS AddClient failed',
        raw: createData,
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: 'WHMCS API Error',
      details: err.message,
    });
  }
}


