import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
//import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../firebase";

function FacultyForgotPassword() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!phone) return alert("Please enter your registered phone number");

    setLoading(true);
    try {
      // ✅ Setup invisible reCAPTCHA (only once)
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      const fullPhone = phone.startsWith("+") ? phone : "+91" + phone;

      // ✅ Send OTP
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhone,
        window.recaptchaVerifier
      );

      alert("OTP sent successfully!");
      navigate("/studentResetPassword", {
        state: { confirmationResult, phone: fullPhone },
      });
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Failed to send OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
      <div id="recaptcha-container"></div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <FadeLoader color="#36d7b7" height={15} width={5} />
          <p>Sending OTP...</p>
        </div>
      ) : (
        <form onSubmit={sendOtp} style={{ maxWidth: "400px", background: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
          <h3 style={{ textAlign: "center", color: "#007bff" }}>Student Forgot Password</h3>

          <label>Registered Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
            style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "6px", width: "100%" }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Send OTP
          </button>
        </form>
      )}
    </div>
  );
}

export default FacultyForgotPassword;
