// src/components/AuthenticatedWrapper.jsx

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthenticatedWrapper = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (
    isAuthenticated &&
    (location.pathname === "/login" || location.pathname === "*")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthenticatedWrapper;
