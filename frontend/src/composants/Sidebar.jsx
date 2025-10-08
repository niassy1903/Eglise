import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false); // Pour mobile
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
          <h2>LOGO</h2>
        </div>
        <ul className="sidebar-menu">
          {/* Tous les utilisateurs voient le Dashboard */}
          <li>
            <Link to="/dashboard">Accueil</Link>
          </li>

          {/* Gestion des utilisateurs uniquement pour rôle non prêtre */}
          {role !== "pretre" && (
            <li>
              <Link to="/utilisateurs">Gestion des utilisateurs</Link>
            </li>
          )}

          {/* Autres menus selon besoin, sans dropdown */}
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

      {/* Hamburger pour mobile */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      {/* Overlay pour fermer le menu en mobile */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Sidebar;
