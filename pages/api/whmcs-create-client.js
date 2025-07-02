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
  const whmcsApiIdentifier = 'YOUR_API_IDENTIFIER'; // ใส่ API Identifier จริง
  const whmcsApiSecret = 'YOUR_API_SECRET';         // ใส่ API Secret จริง

  const params = new URLSearchParams();
  params.append('identifier', whmcsApiIdentifier);
  params.append('secret', whmcsApiSecret);
  params.append('action', 'AddClient');
  params.append('responsetype', 'json');

  params.append('firstname', firstname);
  params.append('lastname', lastname);
  params.append('email', email);
  params.append('password2', password);
  params.append('address1', address1);
  params.append('city', city);
  params.append('state', state);
  params.append('postcode', postcode);
  params.append('country', country);
  params.append('phonenumber', phonenumber);

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
      return res.status(400).json({ success: false, message: data.message });
    }
  } catch (err) {
    return res.status(500).json({ error: 'WHMCS API Error', details: err.message });
  }
}
