export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
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
    firebase_uid, // 👈 รับค่าจาก body
  } = req.body;

  // ✅ วางตรงนี้
  const params = new URLSearchParams({
    action: 'addclient',
    username: process.env.WHMCS_API_IDENTIFIER,
    password: process.env.WHMCS_API_SECRET,
    accesskey: process.env.WHMCS_API_ACCESS_KEY, // optional if used
    responsetype: 'json',

    firstname,
    lastname,
    email,
    password2: password, // WHMCS ใช้ password2
    address1,
    city,
    state,
    postcode,
    country,
    phonenumber,

    // ✅ เพิ่ม custom field โดยใช้ชื่อ field เป็น key
    'customfields[firebase_uid]': firebase_uid,
  });

  try {
    const response = await fetch(process.env.WHMCS_API_URL, {
      method: 'POST',
      body: params,
    });

    const data = await response.json();

    if (data.result === 'success') {
      res.status(200).json({ success: true, clientid: data.clientid });
    } else {
      res.status(500).json({ success: false, message: data.message || 'WHMCS API error' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
