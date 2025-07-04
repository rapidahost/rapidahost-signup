import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, uid } = req.body

  try {
    const response = await axios.post('https://your-whmcs.com/includes/api.php', null, {
      params: {
        action: 'AddClient',
        username: process.env.WHMCS_IDENTIFIER,
        password: process.env.WHMCS_SECRET,
        accesskey: process.env.WHMCS_ACCESSKEY,
        firstname: name,
        lastname: uid.slice(0, 8),
        email,
        password2: uid.slice(0, 12),
        skipvalidation: true,
        responsetype: 'json',
      },
    })

    res.status(200).json(response.data)
  } catch (err) {
    console.error('WHMCS error:', err?.response?.data || err.message)
    res.status(500).json({ error: 'WHMCS Client Creation Failed' })
  }
}
