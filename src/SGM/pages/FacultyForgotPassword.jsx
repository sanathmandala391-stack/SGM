import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { API_URL } from "../data/apiPath"; 

function FacultyForgotPassword() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/forgot-password/faculty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        const text = await response.text();
        console.error("Server returned non-JSON:", text);
        setMessage("❌ Server error, see console");
        return;
      }

      if (response.ok) {
        setMessage("✅ OTP sent! Check your email/phone.");
        navigate("/facultyResetPassword", { state: { phone } });
      } else {
        setMessage(data.message || "❌ Something went wrong");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setMessage("❌ Failed to send OTP");
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
    link: {
      textAlign: 'center',
      color: '#6c757d',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textDecoration: 'none',
    },
    message: {
      textAlign: 'center',
      marginTop: '10px',
      fontWeight: 'bold',
    },
    loader: {
      textAlign: 'center',
      padding: '50px',
    }
  };

  return (
    <div style={styles.container} className="loginSection">
      {loading ? (
        <div style={styles.loader} className="loaderSection">
          <FadeLoader color="#36d7b7" height={15} width={5} radius={2} margin={2} />
          <p>Sending OTP...</p>
        </div>
      ) : (
        <form style={styles.form} className="authForm" onSubmit={handleSubmit}>
          <h3 style={styles.header}>Faculty Forgot Password</h3>

          <label>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone"
            required
            style={styles.input}
          />

          <div className="btnSubmit">
            <button type="submit" style={styles.button}>Send OTP</button>
          </div>

          {message && 
            <p style={{ 
              ...styles.message, 
              color: message.startsWith("❌") ? "#dc3545" : "#28a745" 
            }}>
              {message}
            </p>
          }

          <p onClick={() => navigate("/facultyLogin")} style={{...styles.link, color: '#007bff'}}>
            Back to Login
          </p>
        </form>
      )}
    </div>
  );
}

export default FacultyForgotPassword;