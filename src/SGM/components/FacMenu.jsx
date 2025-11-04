import React from "react";
import { Link } from "react-router-dom";

function FacMenu({ isOpen, onLogout, showTimetableHandler,showNotesHandler,showNoticeHandler }) {
 
  const facultyname = localStorage.getItem("facultyname");

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-menu">

        {facultyname && (
          <div className="profile-box" style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "15px", color: "yellow", cursor:"pointer"}}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              style={{ width: "50px", borderRadius: "50%" }}
            />
            <h4 style={{ margin: "8px 0 0 0" }}>{facultyname}</h4>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>Faculty Account</p>
          </div>
        )}

        <ul>
         <li onClick={showTimetableHandler}>Add Timetables</li>
         <li onClick={showNoticeHandler}>Add Notices</li>
         <li onClick={showNotesHandler}>Add Notes</li>
          <li onClick={onLogout} style={{ cursor: "pointer", color: "yellow" }}>
         Faculty Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FacMenu;

