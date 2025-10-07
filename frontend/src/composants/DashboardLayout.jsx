// src/composants/DashboardLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../css/dashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  return (
    <div className="dashboard-layout">
      {/* Barre latérale */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="main-content">
        <Navbar utilisateur={utilisateur} />
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
