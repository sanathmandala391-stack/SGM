import React, { useState } from "react";
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
      const response = await fetch(`${API_URL}/email/forgot-password`, {
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
            <p onClick={() => navigate("/studentLogin")}>Back to Login</p>
          </div>

          {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
        </form>
      )}
    </div>
  );
}

export default StudentForgotPassword;
