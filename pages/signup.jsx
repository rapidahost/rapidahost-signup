import app from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

function handleSubmit(e) {
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
}



