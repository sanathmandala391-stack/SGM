/*import React, { useState } from "react";
import { API_URL } from "../data/apiPath";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function StudentForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/forgot-password/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "student" }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Reset link sent to your email.");
      } else {
        setMessage(data.message || "❌ Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading ? (
        <div className="loaderSection">
          <FadeLoader color="#36d7b7" height={15} width={5} radius={2} margin={2} />
          <p>Sending reset link...</p>
        </div>
      ) : (
        <form className="authForm" onSubmit={handleForgotPassword}>
          <h3>Forgot Password</h3>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            required
          />

          <div className="btnSubmit">
            <button type="submit">Send Reset Link</button>
            <p onClick={() => navigate("/login")}>Back to Login</p>
          </div>

          {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
        </form>
      )}
    </div>
  );
}

export default StudentForgotPassword;

*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import axios from "axios"; 

function StudentForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your registered email");

    setLoading(true);
    try {
      // ✅ Change this URL to your actual backend URL
      const response = await axios.post("http://localhost:5000/api/forgot-password", {
        email: email
      });

      if (response.data.success) {
        alert("OTP sent to your email!");
        // Passing email to the next page so the user knows where they sent it
        navigate("/studentResetPassword", { state: { email: email } });
      }
    } catch (err) {
      console.error("Error:", err);
      alert(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f7f6", padding: "20px" },
    form: { width: "100%", maxWidth: "400px", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", backgroundColor: "white", display: "flex", flexDirection: "column", gap: "15px" },
    header: { textAlign: "center", color: "#007bff", marginBottom: "10px" },
    input: { padding: "12px", border: "1px solid #ccc", borderRadius: "6px", width: "100%", boxSizing: "border-box" },
    button: { padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "1rem", fontWeight: "bold", marginTop: "10px" },
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <FadeLoader color="#36d7b7" height={15} width={5} />
          <p>Sending OTP...</p>
        </div>
      ) : (
        <form onSubmit={handleSendEmail} style={styles.form}>
          <h3 style={styles.header}>Reset Password</h3>
          <label>Registered Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Send OTP</button>
        </form>
      )}
    </div>
  );
}

export default StudentForgotPassword;