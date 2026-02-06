/* React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../data/apiPath";

const StudentResetPassword = () => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await fetch(`${API_URL}/reset-password/student/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.message || "Password reset successful!");
        setTimeout(() => navigate("/studentlogin"), 2000);
      } else {
        setError(data.message || "Reset failed or token expired");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-xl w-[400px]">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Student Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            className="border p-3 w-full rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Reset Password
          </button>
        </form>
        {msg && <p className="text-green-600 mt-3">{msg}</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default StudentResetPassword;

*/
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Using axios to keep it consistent

function StudentResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // We now get the email from the state passed by the previous page
  const email = state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const verifyOtpAndReset = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return alert("Please fill all fields");

    setLoading(true);
    try {
      // ✅ No Firebase! We send the OTP, Email, and New Password to YOUR backend.
      // Your backend should verify the OTP and then update the password in MongoDB.
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/reset-password/student`, {
        email,
        otp,
        newPassword
      });

      if (res.data.success || res.status === 200) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (err) {
      console.error("Verification failed:", err);
      alert(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f7f6" }}>
      <form onSubmit={verifyOtpAndReset} style={{ width: "100%", maxWidth: "400px", background: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", gap: "15px" }}>
        <h3 style={{ textAlign: "center", color: "#007bff", margin: "0 0 10px 0" }}>Student Reset Password</h3>

        <p style={{ fontSize: "0.9rem", color: "#666", textAlign: "center" }}>
          Resetting password for: <strong>{email}</strong>
        </p>

        <label>Enter OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          required
          maxLength="6"
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "6px", width: "100%", boxSizing: "border-box" }}
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
          style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "6px", width: "100%", boxSizing: "border-box" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            marginTop: "10px",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Verifying..." : "Reset Password"}
        </button>

        {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}
      </form>
    </div>
  );
}

export default StudentResetPassword;