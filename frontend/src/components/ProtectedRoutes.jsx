import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, userRoles }) {
  const [token, setToken] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!userRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoutes;
