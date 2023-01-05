import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYCXOCZljgGpRRfwkkJ00n65TNCONoKFY",
  authDomain: "petproj-45d34.firebaseapp.com",
  projectId: "petproj-45d34",
  storageBucket: "petproj-45d34.appspot.com",
  messagingSenderId: "866924068747",
  appId: "1:866924068747:web:08d6ed9fa92214cf39798e",
};
/*const firebaseConfig = {
  apiKey: "AIzaSyAKdnQ4Y42b22gDFt0dmrL6Gji7qqbDakA",
  authDomain: "petmart-bac77.firebaseapp.com",
  projectId: "petmart-bac77",
  storageBucket: "petmart-bac77.appspot.com",
  messagingSenderId: "955108004878",
  appId: "1:955108004878:web:cd27d03b1741924955185f",
  measurementId: "G-4HKXYY1ZB4",
};*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
