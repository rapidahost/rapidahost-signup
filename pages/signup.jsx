// pages/signup.jsx
import React from "react";
import app from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signup Success:", userCredential.user);
        alert("สมัครสมาชิกเรียบร้อยแล้ว");
      })
      .catch((error) => {
        console.error("Firebase Error:", error.message);
        alert("Signup Failed: " + error.message);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required /><br />
        <input type="password" name="password" placeholder="Password" required /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;




