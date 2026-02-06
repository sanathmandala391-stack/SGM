/*import React from "react";
import { Link } from "react-router-dom";

function AllLogin({FacultyRegister}){
    return(
        <>
        <div className="log">
            <div className="lec">
         <Link to="/facultyregister" className="link"><button>Faculty Login</button></Link>
            </div>
            <br></br>
            <div className="admin">
       <Link to="/admin" className="link"><button>Admin Login</button></Link>
            </div>

        </div>
        </>
    )
}

export default AllLogin;*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AllLogin() {
    const [view, setView] = useState("default"); // 'default', 'facultyKey', or 'adminKey'
    const [inputKey, setInputKey] = useState("");
    const navigate = useNavigate();

    // These should ideally be in your .env file
    const KEYS = {
        FACULTY: "24047",
        ADMIN: "1025-24047"
    };

    const handleVerify = (type) => {
        if (type === "faculty" && inputKey === KEYS.FACULTY) {
            navigate("/facultyregister");
        } else if (type === "admin" && inputKey === KEYS.ADMIN) {
            navigate("/admin");
        } else {
            alert("❌ Invalid Secret Code! Access Denied.");
            setInputKey("");
            setView("default");
        }
    };

    return (
        <div className="log" style={containerStyle}>
            {/* --- FACULTY SECTION --- */}
            <div className="lec" style={sectionStyle}>
                {view !== "facultyKey" ? (
                    <button onClick={() => setView("facultyKey")}>Faculty Login</button>
                ) : (
                    <div style={inputGroupStyle}>
                        <input 
                            type="password" 
                            placeholder="Faculty Code" 
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            style={inputStyle}
                        />
                        <div style={{ display: "flex", gap: "5px" }}>
                            <button onClick={() => handleVerify("faculty")} style={btnConfirm}>Verify</button>
                            <button onClick={() => {setView("default"); setInputKey("");}} style={btnCancel}>X</button>
                        </div>
                    </div>
                )}
            </div>

            <br />

            {/* --- ADMIN SECTION --- */}
            <div className="admin" style={sectionStyle}>
                {view !== "adminKey" ? (
                    <button onClick={() => setView("adminKey")}>Admin Login</button>
                ) : (
                    <div style={inputGroupStyle}>
                        <input 
                            type="password" 
                            placeholder="Admin Code" 
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            style={inputStyle}
                        />
                        <div style={{ display: "flex", gap: "5px" }}>
                            <button onClick={() => handleVerify("admin")} style={btnConfirm}>Verify</button>
                            <button onClick={() => {setView("default"); setInputKey("");}} style={btnCancel}>X</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Simple Inline Styles
const containerStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "20px" };
const sectionStyle = { width: "100%", display: "flex", justifyContent: "center" };
const inputGroupStyle = { display: "flex", flexDirection: "column", gap: "8px", background: "#eee", padding: "15px", borderRadius: "10px" };
const inputStyle = { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" };
const btnConfirm = { backgroundColor: "#28a745", color: "white", padding: "8px 15px" };
const btnCancel = { backgroundColor: "#dc3545", color: "white", padding: "8px 15px" };

export default AllLogin;