export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstname, lastname, email, password, phonenumber, firebase_uid } = req.body;

  try {
    const response = await fetch("https://billing.rapidahost.com/api-create-client.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        phonenumber,
        firebase_uid,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
}


