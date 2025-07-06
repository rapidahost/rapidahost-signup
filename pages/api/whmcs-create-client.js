export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstname,
    lastname,
    email,
    phonenumber,
    password,
    firebase_uid,
  } = req.body;

  try {
    const whmcsResponse = await fetch("https://billing.rapidahost.com/api-create-client.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phonenumber,
        password,
        firebase_uid,
      }),
    });

    const result = await whmcsResponse.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "WHMCS relay failed", detail: error.message });
  }
}
