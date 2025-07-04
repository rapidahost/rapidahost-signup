// pages/api/whmcs-create-client.js
export default async function handler(req, res) {
  const response = await fetch("https://billing.rapidahost.com/includes/api.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "CreateClient",
      accesskey: process.env.WHMCS_API_ACCESS_KEY,
      ...req.body, // รับข้อมูลจาก frontend ที่ส่งเข้ามา
    }),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
