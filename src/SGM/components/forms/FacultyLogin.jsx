import React,{useState} from "react";
import { API_URL } from "../../data/apiPath";
import { useNavigate } from "react-router-dom";
import {FadeLoader} from "react-spinners"

function FacultyLogin(){
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
        const response=await fetch(`${API_URL}/api/facultyLogin`,{
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        alert("Login Successful!");
        localStorage.setItem("facultyToken", data.token);
           localStorage.setItem("facultyname", data.name);

        setEmail("");
        setPassword("");
  navigate("/facultyservices");

      } else {
        alert(data.error || "Invalid credentials");
      }
        }
    
    catch(err){
 console.log("Login Failed",err);
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
        <p>Faculty Login In Process...</p>
            </div>
          )}

          {!loading && (
     <form className="authForm" onSubmit={loginHandler} autoComplete="off">
            <h3>Faculty Login</h3>

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
              <p onClick={()=>navigate("/facultyregister")}>Did'nt Register Click Here to Register</p>
            </div>
          </form>
          )}
        </div>
        </>
    )
  
    
}
export default FacultyLogin;