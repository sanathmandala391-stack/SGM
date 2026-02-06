// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// ✅ Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyB819Dng6Zwg9mrwrIlgLeIcJmUaNvJnLY",
  authDomain: "college-otp-ff761.firebaseapp.com",
  projectId: "college-otp-ff761",
  storageBucket: "college-otp-ff761.firebasestorage.app",
  messagingSenderId: "982156841679",
  appId: "1:982156841679:web:bbe1cb3106172151425dba",
  measurementId: "G-DKZPZLGK19"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Function to send OTP
export const sendOtp = async (phoneNumber) => {
  // make sure there’s a <div id="recaptcha-container"></div> in your component
  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    { size: "invisible" } // invisible reCAPTCHA for smooth UX
  );

  return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};