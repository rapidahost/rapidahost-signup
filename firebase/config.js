import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  appId: 'YOUR_APP_ID',
};

export const app = initializeApp(firebaseConfig);
