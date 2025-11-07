import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../data/apiPath";
import { FadeLoader } from "react-spinners";

function FacultyRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/facultyRegister`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Faculty Registered Successfully!");
        navigate("/facultylogin");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Registration Failed");
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
    passwordContainer: {
      position: 'relative',
    },
    showHide: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '0.9rem',
      color: '#007bff',
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
    },
    loader: {
      textAlign: 'center',
      padding: '50px',
    }
  };

  return (
    <div style={styles.container} className="registerSection">
      {loading ? (
        <div style={styles.loader} className="loaderSection">
          <FadeLoader color="#36d7b7" loading={loading} height={15} width={5} />
          <p>Registering...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form} className="authForm" autoComplete="off">
          <h3 style={styles.header}>Faculty Register</h3>
          
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
          
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          
          <label>Password</label>
          <div style={styles.passwordContainer}>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={styles.input}
            />
            <span onClick={handleShowPassword} style={styles.showHide}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required style={styles.input} />
          
          <button type="submit" style={styles.button}>Register</button>
          
          <p onClick={() => navigate("/facultylogin")} style={styles.link}>
            Already registered? Login
          </p>
        </form>
      )}
    </div>
  );
}

export default FacultyRegister;