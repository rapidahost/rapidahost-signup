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

