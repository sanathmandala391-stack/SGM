/*import React,{useState}from "react";
import { API_URL } from "../../data/apiPath";
import { useNavigate } from "react-router-dom";
import {FadeLoader} from "react-spinners"

function StudentLogin({onLoginSuccess}){
  const navigate=useNavigate();
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/studentLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        alert("Login Successful!");
        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("studentName", data.name);

        setEmail("");
        setPassword("");

        
        if (onLoginSuccess) onLoginSuccess();
  
  navigate("/studentPortal");

      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Login Failed. Please try again.");
    }finally{
      setLoading(false);
    }
}
    return(
        <>
        <div className="loginSection">
          {loading &&(

            <div className="loaderSection">

      <FadeLoader
          color="#36d7b7"
          loading={loading}
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
        <p>Login In Process...</p>
            </div>
          )}

          {!loading && (
     <form className="authForm" onSubmit={loginHandler} autoComplete="off">
            <h3>Student Login</h3>

            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
            <br />

            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
            <br />

            <span className="showPassword" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </span>

            <div className="btnSubmit">
              <button type="submit">Submit</button>
              <br></br>
              <p onClick={()=>navigate("/Register")}>Did'nt Register Click Here to Register</p>
              <p onClick={() => navigate("/studentForgotPassword")}>Forgot Password?</p>
            </div>
          </form>
          )}
        </div>
        </>
    )
  
}

export default StudentLogin;

*/

import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function StudentLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Added phone if you want OTP login later
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/studentLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // still email+password login
      });

      const data = await response.json();

      if (response.ok && data.token) {
        alert("Login Successful!");
        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("studentName", data.name);

        setEmail("");
        setPassword("");
        if (onLoginSuccess) onLoginSuccess();

        navigate("/studentPortal");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Login Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading && (
        <div className="loaderSection">
          <FadeLoader color="#36d7b7" loading={loading} height={15} width={5} radius={2} margin={2} />
          <p>Login In Process...</p>
        </div>
      )}

      {!loading && (
        <form className="authForm" onSubmit={loginHandler} autoComplete="off">
          <h3>Student Login</h3>

          <label>Email</label>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
          <br />

          <label>Password</label>
          <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" required />
          <br />

          <span className="showPassword" onClick={handleShowPassword}>{showPassword ? "Hide" : "Show"}</span>

          <div className="btnSubmit">
            <button type="submit">Submit</button>
            <br />
            <p onClick={() => navigate("/Register")}>Didn't Register? Click Here to Register</p>
            <p onClick={() => navigate("/studentForgotPassword")}>Forgot Password?</p>
          </div>
        </form>
      )}
    </div>
  );
}

export default StudentLogin;
