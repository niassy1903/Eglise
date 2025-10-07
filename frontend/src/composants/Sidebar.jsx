// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar() {
  const [certificatOpen, setCertificatOpen] = useState(false);

  const toggleCertificat = () => setCertificatOpen(!certificatOpen);

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>LOGO</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/utilisateurs">Gestion des utilisateurs</Link>
        </li>
        <li>
          <button className="dropdown-btn" onClick={toggleCertificat}>
            Gestion des certificats
            <span className={`arrow ${certificatOpen ? "open" : ""}`}>▼</span>
          </button>
          {certificatOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/certificat/deces">Certificat de décès</Link>
              </li>
              <li>
                <Link to="/certificat/naissance">Certificat de naissance</Link>
              </li>
              <li>
                <Link to="/certificat/mariage">Certificat de mariage</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
