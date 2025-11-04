import React from "react";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({children}){
      const adminToken = localStorage.getItem("adminToken");
  const adminRegistered = localStorage.getItem("adminRegistered");

  
  if (!adminToken) {

    if (!adminRegistered) {
  
      return <Navigate to="/adminRegister" replace />;
    } else {
     
      return <Navigate to="/adminLogin" replace />;
    }
  }
   return children;
}
export default AdminProtectedRoute;