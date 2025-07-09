import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../lib/firebase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setMessage(`Signup successful: ${user.email}`);

      // เรียก WHMCS API เพื่อสร้าง client ใหม่
      await fetch('/api/createClient', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com' })
});

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Sign Up</button>
        <p>{message}</p>
      </form>
    </div>
  );
}





