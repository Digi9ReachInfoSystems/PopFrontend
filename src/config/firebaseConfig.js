// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"; // Firebase authentication
// import { getStorage } from "firebase/storage"; // Firebase storage

// const firebaseConfig = {
// //   apiKey: "AIzaSyDZF4e9nAL17nGTaTT9Tehmht9M73HsaR4",
// //   authDomain: "lmseducationplaform.firebaseapp.com",
//   projectId: "popandpose-1ea69",
//   storageBucket: "popandpose-1ea69.firebasestorage.app",
// //   messagingSenderId: "791494608780",
// //   appId: "1:791494608780:web:19537fa099d9bf6f8238a9",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app); // Export Firebase Auth instance
// export const storage = getStorage(app); // Export Firebase Storage instance

// export default app;



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Firebase storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmfgHuF6W2rNsuNavvyG4tdZXb6ngSfAI",
  authDomain: "popandpose-1ea69.firebaseapp.com",
  projectId: "popandpose-1ea69",
  storageBucket: "popandpose-1ea69.firebasestorage.app",
  messagingSenderId: "357398841892",
  appId: "1:357398841892:web:73efee602c27f8c93a66b1",
  measurementId: "G-HP0E1SYS24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app); // Export Firebase Storage instance

export const auth = getAuth(app); 
export const analytics = getAnalytics(app);
export default app;