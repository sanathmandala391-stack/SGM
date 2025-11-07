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
import { API_URL } from "../data/apiPath";

function StudentResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || ""; 

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // For displaying success/error

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!otp) return setMessage("Please enter OTP");
    if (!newPassword || newPassword.length < 6)
      return setMessage("Password must be at least 6 characters");

    try {
      const res = await fetch(`${API_URL}/api/reset-password/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp, newPassword }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
          setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setMessage("Failed to reset password. Try again.");
    } finally {
        setLoading(false);
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
    form: {
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
        color: '#dc3545', // Default to error color
    }
  };

  return (
    <div style={styles.container} className="authForm">
      {loading ? (
        <p style={{ ...styles.message, color: '#007bff' }}>Resetting password...</p>
      ) : (
        <form onSubmit={resetPassword} style={styles.form}>
          <h3 style={styles.header}>Student Reset Password</h3>
          
          <label>Enter OTP</label>
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
          
          <button type="submit" style={styles.button}>Reset Password</button>
          
          {message && <p style={{...styles.message, color: (message.includes('success') || message.includes('Success')) ? '#28a745' : '#dc3545'}}>{message}</p>}
        </form>
      )}
    </div>
  );
}

export default StudentResetPassword;