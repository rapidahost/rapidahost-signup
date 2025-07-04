const response = await fetch("https://billing.rapidahost.com/api-create-client.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    action: "CreateClient",
    ...req.body
  }),
});

