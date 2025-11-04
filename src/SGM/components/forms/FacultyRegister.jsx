import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../data/apiPath";
import { FadeLoader } from "react-spinners";

function FacultyRegister(){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
      const [showPassword, setShowPassword] = useState(false);
      const[loading,setLoading]=useState(false);
       const navigate = useNavigate();

        const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);

    try{
   const response= await fetch(`${API_URL}/api/facultyRegister`,{
    method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

    
        if (response.ok) {
  alert("Lecturer Registered Successfully!");
  localStorage.setItem("facultyRegistered", "true");
  navigate("/facultylogin");
}
 else {
        alert(data.error || "Registration Failed");
      }
   }
    
    catch(err){
    console.log("Registration Failed",err);
    alert("Failed to Register")
    }finally{
        setLoading(false);
    }


  }
 return(
     <div className="registerSection">
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
              <p>Faculty Register In Process...</p>
                  </div>
                )}

    {!loading &&(  <form className="authForm" onSubmit={handleSubmit} autoComplete="off">
        <h3>Faculty Register</h3>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
        />

        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
        />

        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />

        <span className="showPassword" onClick={handleShowPassword}>
          {showPassword ? "Hide" : "Show"}
        </span>
        <div className="btnSubmit">
          <button type="submit">Register</button>
          <br></br>
          <p onClick={()=>navigate("/facultylogin")}>Already Register Click Here to Login</p>
        </div>
      </form>
    )}
    </div>
 )


}

export default FacultyRegister;