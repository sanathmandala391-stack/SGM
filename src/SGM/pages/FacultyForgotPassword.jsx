import React, { useState } from "react";
import { API_URL } from "../data/apiPath";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function FacultyForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/forgot-password`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, role: "faculty" }),
});


      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Reset link sent to your email");
        setEmail("");
      } else {
        setMessage(data.message || "❌ Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Failed to send reset link");
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
        <form className="authForm" onSubmit={handleSubmit}>
          <h3>Faculty Forgot Password</h3>

          <label>Enter Your Email</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="btnSubmit">
            <button type="submit">Send Reset Link</button>
          </div>

          {message && (
            <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
          )}

          <p
            style={{ marginTop: "10px", cursor: "pointer", color: "#36d7b7" }}
            onClick={() => navigate("/facultyLogin")}
          >
            Back to Login
          </p>
        </form>
      )}
    </div>
  );
}

export default FacultyForgotPassword;
