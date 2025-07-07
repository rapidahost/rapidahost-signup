import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const res = await fetch('https://billing.rapidahost.com/api-create-client.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.result === 'success') {
        alert('✅ สมัครสมาชิกสำเร็จ');
      } else {
        alert(`❌ สมัครไม่สำเร็จ: ${data.message}`);
      }
    } catch (error) {
      alert('❌ เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ Billing');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 20, border: '1px solid #ccc' }}>
      <h2>สมัครสมาชิก Rapidahost</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email:</label><br />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password:</label><br />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>สมัครสมาชิก</button>
      </form>
    </div>
  );
}


