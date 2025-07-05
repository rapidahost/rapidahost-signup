const response = await fetch("https://billing.rapidahost.com/api-create-client.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    accesskey: process.env.WgxMFWsrvlNgYjy36h2taCX4nSBLKbnx,  // ✅ ใส่ accesskey ที่นี่!
    action: "CreateClient",
    ...req.body,
  }),
});


