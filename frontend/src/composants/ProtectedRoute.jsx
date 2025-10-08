import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, rolesAllowed }) => {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  if (!utilisateur) {
    return <Navigate to="/" replace />;
  }

  if (!rolesAllowed.includes(utilisateur.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
