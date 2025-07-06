import { useState } from 'react';

export default function Signup() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('https://billing.rapidahost.com/api-create-client.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      alert(JSON.stringify(result));
    } catch (err) {
      console.error('Error:', err);
      alert('Signup failed. See console.');
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <input name="firstname" placeholder="First Name" onChange={handleChange} />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} />
      <input name="phonenumber" placeholder="Phone" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

