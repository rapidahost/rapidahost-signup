export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const response = await fetch("https://billing.rapidahost.com/includes/api.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "CreateClient",
      accesskey: process.env.WHMCS_API_ACCESS_KEY,
      ...req.body, // ข้อมูลจาก frontend
    }),
  });

  const text = await response.text();
  try {
    const data = JSON.parse(text);
    res.status(response.status).json(data);
  } catch (err) {
    res.status(response.status).json({ error: "Invalid JSON response", raw: text });
  }
}
