import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyC1gTZbTrEY6zeJVr4E6e9LUaq6wRENXT8',
  authDomain: 'aiweb-7e40e.firebaseapp.com',
  projectId: 'aiweb-7e40e',
  storageBucket: 'aiweb-7e40e.firebasestorage.app',
  messagingSenderId: '814750704386',
  appId: '1:814750704386:web:828591495193eed4b4581b',
  measurementId: 'G-XQQE8CLVXZ',
};

/** Hosting + Analytics only. No Auth / Firestore product registry on corp. */
export const app = initializeApp(firebaseConfig);

void isSupported().then((ok) => {
  if (ok) getAnalytics(app);
});
