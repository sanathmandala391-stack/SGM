import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../data/apiPath"; 

const FacultyResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const phoneFromPrev = location.state?.phone || "";

  const [phone, setPhone] = useState(phoneFromPrev);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!phone) return setError("Phone number is missing");
    if (!otp) return setError("OTP is required");
    if (!newPassword || newPassword.length < 6) return setError("Password must be at least 6 characters");

    try {
      const response = await fetch(`${API_URL}/api/reset-password/faculty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp, newPassword }),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        const text = await response.text();
        console.error("Server returned non-JSON:", text);
        setError("❌ Server error, see console");
        return;
      }

      if (response.ok) {
        setMsg(data.message);
        setPhone("");
        setOtp("");
        setNewPassword("");
        setTimeout(() => navigate("/facultyLogin"), 2000);
      } else {
        setError(data.message || "❌ Error resetting password");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Failed to reset password");
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f7f6',
      padding: '20px',
    },
    card: {
      width: '100%',
      maxWidth: '400px',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    header: {
      textAlign: 'center',
      color: '#007bff',
      marginBottom: '10px',
    },
    input: {
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      width: '100%',
      boxSizing: 'border-box',
    },
    otpInput: { // Styling for a clear OTP input
      padding: '12px',
      border: '2px solid #007bff',
      borderRadius: '6px',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'center',
      letterSpacing: '5px',
      fontSize: '1.2rem',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    message: {
      textAlign: 'center',
      marginTop: '10px',
      fontWeight: 'bold',
      fontSize: '0.9rem',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.header}>Faculty Reset Password</h3>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          
          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone"
            required
            style={styles.input}
          />

          <label>OTP (Check your email/phone)</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            required
            maxLength="6"
            style={styles.otpInput} // Uses special OTP styling
          />

          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Reset Password
          </button>
        </form>

        {msg && <p style={{ ...styles.message, color: '#28a745' }}>{msg}</p>}
        {error && <p style={{ ...styles.message, color: '#dc3545' }}>{error}</p>}
      </div>
    </div>
  );
};

export default FacultyResetPassword;