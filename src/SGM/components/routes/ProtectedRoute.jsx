

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("loginToken");
  const registered = localStorage.getItem("isRegistered");

  if (!token) {
    if (!registered) {
      return <Navigate to="/register" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
