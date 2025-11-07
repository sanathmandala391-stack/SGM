import React,{useState} from "react";
import { API_URL } from "../../data/apiPath";
import { useNavigate } from "react-router-dom";
import {FadeLoader} from "react-spinners"

function AdminLogin(){
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{
      const response=await fetch(`${API_URL}/api/adminLogin`,{
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        alert("Login Successful!");
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("admin", data.name); // Assuming 'data.name' contains the admin's name

        setEmail("");
        setPassword("");
        navigate("/admin");

      } else {
        alert(data.error || "Invalid credentials");
      }
    }
    
    catch(err){
      console.log("Login Failed",err);
      alert("Login Failed. Check console for details.");
    }finally{
      setLoading(false);
    }
  }

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
      top: '65%', // Adjust based on label position
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
      marginTop: '10px',
    },
    loader: {
      textAlign: 'center',
      padding: '50px',
    }
  };

  return(
    <div style={styles.container} className="loginSection">
      {loading ? (
        <div style={styles.loader} className="loaderSection">
          <FadeLoader
            color="#36d7b7"
            loading={loading}
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
          <p>Admin Login In Process...</p>
        </div>
      ) : (
        <form style={styles.form} className="authForm" onSubmit={loginHandler} autoComplete="off">
          <h3 style={styles.header}>Admin Login</h3>

          <label>Email</label>
          <input
            type="email" // Changed type to email for better mobile keyboard
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
            style={styles.input}
          />

          <label>Password</label>
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
              style={styles.input}
            />
          </div>

          <span style={styles.showHide} onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </span>

          <div className="btnSubmit">
            <button type="submit" style={styles.button}>Login</button>
            <p onClick={()=>navigate("/adminRegister")} style={styles.link}>
              Didn't Register? Click Here to Register
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
export default AdminLogin;