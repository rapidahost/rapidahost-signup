// frontend/src/hooks/useSignup.ts
import axios from 'axios'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'

export async function signUpUser(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  // เรียก API ไป backend หลังจากสมัครเสร็จ
  await axios.post('/api/create-whmcs-client', {
    email,
    name: userCredential.user.displayName || 'New Firebase User',
    uid: userCredential.user.uid,
  })

  return userCredential
}
