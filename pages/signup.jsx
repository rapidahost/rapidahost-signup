// pages/signup.jsx
import React from "react";
import app from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

const Signup = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const phonenumber = e.target.phonenumber.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔁 ส่งข้อมูลไป WHMCS API
      const res = await fetch('/api/whmcs-create-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          phonenumber,
          firebase_uid: user.uid, // ✅ ส่ง Firebase UID ไปเก็บใน WHMCS
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("สมัครสมาชิกเรียบร้อยแล้ว");
      } else {
        console.error("WHMCS Error:", data);
        alert("สมัคร Firebase สำเร็จ แต่ส่งข้อมูลไป WHMCS ไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Firebase Error:", error.message);
      alert("Signup Failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstname" placeholder="First Name" required /><br />
        <input type="text" name="lastname" placeholder="Last Name" required /><br />
        <input type="text" name="phonenumber" placeholder="Phone Number" required /><br />
        <input type="email" name="email" placeholder="Email" required /><br />
        <input type="password" name="password" placeholder="Password" required /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
