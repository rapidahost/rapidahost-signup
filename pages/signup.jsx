import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firebase_uid = "abc123xyz"; // ดึงจาก Firebase Auth จริงใน production

    const response = await fetch("/api/whmcs-create-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, firebase_uid }),
    });

    const result = await response.json();
    console.log("WHMCS Response:", result);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input name="firstname" onChange={handleChange} placeholder="First Name" />
        <input name="lastname" onChange={handleChange} placeholder="Last Name" />
        <input name="phonenumber" onChange={handleChange} placeholder="Phone Number" />
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

