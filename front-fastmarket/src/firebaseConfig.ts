import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY_FIREBASE,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN_FIREBASE,
  projectId: import.meta.env.VITE_APP_PROJECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SERVER_ID_FIREBASE,
  appId: import.meta.env.VITE_APP_APP_ID_FIREBASE,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
