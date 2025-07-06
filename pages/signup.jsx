// pages/signup.jsx

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

  const handleSubmit = async e => {
    e.preventDefault();

    const firebase_uid = 'example_firebase_uid'; // คุณจะต้องใส่จาก Firebase Auth จริง

    const res = await fetch('/api/whmcs-create-client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form, firebase_uid }),
    });

    const result = await res.json();
    console.log('WHMCS Response:', result);

    if (res.ok) {
      alert('สมัครสำเร็จ');
      // หรือ redirect: window.location.href = "/login";
    } else {
      alert('เกิดข้อผิดพลาด: ' + (result.error || 'ไม่สามารถสมัครได้'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input name="firstname" placeholder="Firstname" onChange={handleChange} required />
      <input name="lastname" placeholder="Lastname" onChange={handleChange} required />
      <input name="phonenumber" placeholder="Phone Number" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}
