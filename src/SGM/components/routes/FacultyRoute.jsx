import React from "react";
import { Navigate } from "react-router-dom";

const FacultyRoute = ({ children }) => {
  const facultyToken = localStorage.getItem("facultyToken");
  const facultyRegistered = localStorage.getItem("facultyRegistered");

  if (!facultyToken) {

    if (!facultyRegistered) {
  
      return <Navigate to="/facultyregister" replace />;
    } else {
     
      return <Navigate to="/facultylogin" replace />;
    }
  }


  return children;
};

export default FacultyRoute;
