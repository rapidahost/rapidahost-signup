import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    firstname,
    lastname,
    email,
    phone,
    password
  } = req.body;

  const accessKey = process.env.WHMCS_API_ACCESS_KEY; // เก็บไว้ใน Vercel Secret

  const postData = {
    action: 'AddClient',
    username: 'admin_api_username', // ไม่จำเป็นถ้าใช้ accesskey แบบ full
    accesskey: accessKey,
    firstname,
    lastname,
    email,
    phonenumber: phone,
    password2: password,
    responsetype: 'json'
  };

  try {
    const response = await axios.post('https://billing.rapidahost.com/includes/api.php', null, {
      params: postData
    });

    if (response.data.result === 'success') {
      return res.status(200).json({ success: true, clientId: response.data.clientid });
    } else {
      return res.status(400).json({ error: response.data.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
