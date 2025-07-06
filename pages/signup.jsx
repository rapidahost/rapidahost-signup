import { useState } from 'react';

export default function Signup() {
  const [form, setForm] = useState({ firstname: '', lastname: '', phone: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://billing.rapidahost.com/api-create-client.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    console.log('WHMCS Response:', result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="First Name" onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
      <input placeholder="Last Name" onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
      <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
}

