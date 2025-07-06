// pages/signup.jsx
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://billing.rapidahost.com/api-create-client.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("WHMCS Response:", data);
      alert(data.message || "Signup complete");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input name="firstname" placeholder="First Name" onChange={handleChange} />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
