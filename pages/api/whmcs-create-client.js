export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, firstName, lastName } = req.body;

  const payload = new URLSearchParams({
    identifier: process.env.WHMCS_IDENTIFIER,
    secret: process.env.WHMCS_SECRET,
    action: 'AddClient',
    firstname: firstName,
    lastname: lastName,
    email,
    password2: Math.random().toString(36).slice(-10),
    responsetype: 'json'
  });

  try {
    const response = await fetch(`${process.env.WHMCS_URL}/includes/api.php`, {
      method: 'POST',
      body: payload
    });
    const data = await response.json();
    if (data.result === 'success') {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: data.message });
    }
  } catch (err) {
    res.status(500).json({ error: 'WHMCS API failed' });
  }
}
