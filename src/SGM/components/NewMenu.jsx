import React from "react";
import { Link } from "react-router-dom";

function NewMenu({ isOpen, onLogout }) {
 
  const studentName = localStorage.getItem("studentName");

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-menu">

        {studentName && (
          <div className="profile-box" style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "15px", color: "yellow" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              style={{ width: "50px", borderRadius: "50%" }}
            />
            <h4 style={{ margin: "8px 0 0 0" }}>{studentName}</h4>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>Student Account</p>
          </div>
        )}

        <ul>
          <Link to="https://sbtet.telangana.gov.in/index.html" className="link">
            <li>SBTET OFFICIAL</li>
          </Link>
          <Link to="https://www.sbtet.telangana.gov.in/index.html#!/index/DiplomaStudentResult" className="link">
            <li>Results</li>
          </Link>
          <Link to="https://sbtet.telangana.gov.in/index.html#!/index/StudentAttendance" className="link">
            <li>View Attendance</li>
          </Link>
          <Link to="https://sbtet.telangana.gov.in/index.html#!/index/ViewSyllabus" className="link">
            <li>Syllabus</li>
          </Link>
          <Link to="https://sbtet.telangana.gov.in/index.html#!/index/DiplomaHallticket" className="link">
            <li>Hall tickets</li>
          </Link>
          <Link to="https://sbtet.telangana.gov.in/index.html#!/index/DiplomaFeePayment" className="link">
            <li>Fee Payment</li>
          </Link>
          <Link to="https://www.antiragging.in/complaint_register_form.html" className="link">
            <li>Anti Ragging</li>
          </Link>
          <li onClick={onLogout} style={{ cursor: "pointer", color: "yellow" }}>
            Student Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NewMenu;
