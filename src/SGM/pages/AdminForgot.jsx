import React, { useState } from "react";
import { API_URL } from "../data/apiPath";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function AdminForgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/adminForgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/adminReset"); // go to reset page
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgotSection">
      {loading ? (
        <div className="loaderSection">
          <FadeLoader color="#36d7b7" loading={loading} />
          <p>Sending OTP...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="authForm">
          <h3>Admin Forgot Password</h3>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      )}
    </div>
  );
}

export default AdminForgot;
