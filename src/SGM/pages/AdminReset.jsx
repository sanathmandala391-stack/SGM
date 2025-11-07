import React, { useState } from "react";
import { API_URL } from "../data/apiPath";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function AdminReset() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/resetAdminPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/adminLogin");
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error(err);
      alert("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resetSection">
      {loading ? (
        <div className="loaderSection">
          <FadeLoader color="#36d7b7" loading={loading} />
          <p>Resetting password...</p>
        </div>
      ) : (
        <form onSubmit={handleReset} className="authForm">
          <h3>Reset Admin Password</h3>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            required
          />

          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />

          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />

          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default AdminReset;
