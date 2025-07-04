// pages/api/whmcs-create-client.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, password } = req.body;

  const params = new URLSearchParams();
  params.append('action', 'AddClient');
  params.append('firstname', firstName);
  params.append('lastname', lastName);
  params.append('email', email);
  params.append('phonenumber', phone);
  params.append('password2', password);
  params.append('responsetype', 'json');
  params.append('username', process.env.WHMCS_API_USERNAME);
  params.append('identifier', process.env.WHMCS_API_IDENTIFIER);
  params.append('secret', process.env.WHMCS_API_SECRET);

  try {
    const response = await fetch(process.env.WHMCS_API_URL, {
      method: 'POST',
      body: params,
    });

    const data = await response.json();

    if (data.result === 'success') {
      return res.status(200).json({ success: true, clientid: data.clientid });
    } else {
      return res.status(500).json({ error: data.message || 'WHMCS Client Creation Failed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Request Failed', details: error.message });
  }
}
