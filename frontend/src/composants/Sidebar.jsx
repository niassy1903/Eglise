import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";
import logoEglise from "../assets/eglise-logo.jpg"; // 👈 ton logo d’église

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const userData = localStorage.getItem("utilisateur");
    if (userData) {
      const utilisateur = JSON.parse(userData);
      setRole(utilisateur.role);
    }
  }, []);

  return (
    <>
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <h2>Eglise</h2><br />
          <img src={logoEglise} alt="Logo Église" className="logo-eglise" />
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">Accueil</Link>
          </li>

          {role !== "pretre" && (
            <li>
              <Link to="/utilisateurs">Gestion des utilisateurs</Link>
            </li>
          )}

          {role !== "admin" && (
            <>
              <li>
                <Link to="/naissance">Naissances</Link>
              </li>
              <li>
                <Link to="/mariage">Mariages</Link>
              </li>
              <li>
                <Link to="/deces">Décès</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Sidebar;
