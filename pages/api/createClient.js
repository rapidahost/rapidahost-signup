// pages/api/createClient.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const formData = new URLSearchParams();
  formData.append('action', 'AddClient');
  formData.append('username', process.env.NEXT_PUBLIC_WHMCS_IDENTIFIER);
  formData.append('password', process.env.NEXT_PUBLIC_WHMCS_SECRET);
  formData.append('responsetype', 'json');

  formData.append('firstname', 'User');
  formData.append('lastname', 'Firebase');
  formData.append('email', email);
  formData.append('address1', 'Auto Created');
  formData.append('city', 'Bangkok');
  formData.append('state', 'TH');
  formData.append('postcode', '10100');
  formData.append('country', 'TH');
  formData.append('phonenumber', '0000000000');
  formData.append('password2', password);

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_WHMCS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    const data = await response.json();

    if (data.result === 'success') {
      return res.status(200).json({ success: true, clientid: data.clientid });
    } else {
      return res.status(500).json({ success: false, error: data.message });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
