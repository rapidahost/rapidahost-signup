const params = new URLSearchParams({
  identifier: whmcsApiIdentifier,
  secret: whmcsApiSecret,
  action: 'AddClient',
  responsetype: 'json',
  firstname,
  lastname,
  email,
  password2: password,
  address1,
  city,
  state,
  postcode,
  country,
  phonenumber,
  [`customfields[firebase_uid]`]: uid, // ส่ง UID ตรงนี้
});


