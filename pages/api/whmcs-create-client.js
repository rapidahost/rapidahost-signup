export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      password
    } = req.body;

    const body = {
      firstname,
      lastname,
      email,
      phonenumber,
      password,
      identifier: "WgxMFWsrvlNgYjy36h2taCX4nSBLKbnx", // ✅ จาก WHMCS
      secret: "f0cwwd42iNulOj6erwLNLgRhL4vJZBuH"      // ✅ จาก WHMCS
    };

    const response = await fetch("https://billing.rapidahost.com/api-create-client.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
