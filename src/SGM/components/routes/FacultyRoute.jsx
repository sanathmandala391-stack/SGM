// src/components/routes/FacultyRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

const FacultyRoute = ({ children }) => {
  // CRITICAL FIX: Check for the key set in FacultyLogin.jsx
  const facultyAuthId = localStorage.getItem("facultyId");
  // The 'facultyRegistered' logic is removed as it's redundant and wasn't being set.

  if (!facultyAuthId) {
    // If the authentication token (facultyId) is NOT present, redirect to the LOGIN page.
    return <Navigate to="/facultylogin" replace />;
  }

  // If facultyAuthId is present, the user is authenticated, and the protected content is rendered.
  return children;
};

export default FacultyRoute;