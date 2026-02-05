import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase"; // make sure firebase.js exports 'auth'

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // ✅ Step 1: Send OTP
  const sendOtp = async () => {
    try {
      if (!phone.startsWith("+")) {
        alert("Please include country code (e.g. +91xxxxxxxxxx)");
        return;
      }

      // reCAPTCHA verifier (only once)
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "normal",
          callback: () => console.log("reCAPTCHA solved ✅"),
        });
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmationResult;
      setShowOtp(true);
      alert("OTP sent successfully!");
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert(err.message);
    }
  };

  // ✅ Step 2: Verify OTP
  const verifyOtp = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      const token = await user.getIdToken();

      // ✅ Step 3: Send token to backend for verification
      const res = await fetch("http://localhost:5000/api/verify-otp/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        alert("Phone verified successfully!");
      } else {
        alert(data.message || "Verification failed");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      alert("Invalid OTP or expired.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📱 Firebase Phone Login</h2>
      <div>
        <input
          type="tel"
          placeholder="+91xxxxxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={sendOtp}>Send OTP</button>
      </div>

      <div id="recaptcha-container" style={{ margin: "10px 0" }}></div>

      {showOtp && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default PhoneLogin;
