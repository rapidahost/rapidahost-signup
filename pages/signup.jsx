import axios from 'axios';

...

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    setMessage(`Signup successful: ${user.email}`);

    // ✅ เรียก WHMCS API เพื่อสร้าง client ใหม่
    await axios.post('/api/createClient', {
      email,
      password
    });

  } catch (error) {
    setMessage(error.message);
  }
};




