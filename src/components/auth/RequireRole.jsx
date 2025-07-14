import React from "react";
import { Navigate } from "react-router-dom";

const RequireRole = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // User not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // User logged in but role is not allowed
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        <h2>403 - Forbidden</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  return children;
};

export default RequireRole;
