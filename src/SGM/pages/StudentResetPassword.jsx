import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { useParams, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function StudentResetPassword() {
  const { role, token } = useParams(); // from the reset link
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/email/reset-password/${role}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset successful. Redirecting...");
        setTimeout(() => navigate("/studentLogin"), 2000);
      } else {
        setMessage(data.message || "❌ Reset failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading ? (
        <div className="loaderSection">
          <FadeLoader color="#36d7b7" height={15} width={5} radius={2} margin={2} />
          <p>Resetting your password...</p>
        </div>
      ) : (
        <form className="authForm" onSubmit={handleResetPassword}>
          <h3>Reset Password</h3>

          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            required
          />

          <div className="btnSubmit">
            <button type="submit">Reset Password</button>
          </div>

          {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
        </form>
      )}
    </div>
  );
}

export default StudentResetPassword;
