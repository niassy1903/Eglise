import React, { useState } from "react";
import "../css/navbar.css";

function Navbar({ utilisateur }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4" style={{minHeight: 64}}>
      <div className="container-fluid">
        {/* Gauche : Logo/nom */}
        <span className="navbar-brand mb-0 h1" style={{fontFamily: "'Pacifico', cursive", fontSize: "2rem", color: "#ff8000", letterSpacing: "2px"}}>
          Église
        </span>

        {/* Centre : Barre de recherche */}
        <form className="d-none d-md-flex mx-auto" style={{width: "40%"}}>
          <input
            className="form-control rounded-pill px-4"
            type="search"
            placeholder="Rechercher..."
            aria-label="Rechercher"
            style={{boxShadow: "0 2px 8px rgba(0,0,0,0.06)"}}
          />
        </form>

        {/* Droite : Utilisateur */}
        <div className="d-flex align-items-center position-relative">
          <div
            className="d-flex align-items-center user-info"
            style={{cursor: "pointer"}}
            onClick={toggleDropdown}
          >
            <i className="fas fa-user-circle fa-2x me-2" style={{color: "#ff8000"}}></i>
            <span className="fw-semibold" style={{fontSize: "1.1rem"}}>
              {utilisateur?.prenom} {utilisateur?.nom}
            </span>
            <i className="fas fa-caret-down ms-2"></i>
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu show mt-2" style={{right: 0, left: "auto", minWidth: 160, position: "absolute"}}>
              <li>
                <a className="dropdown-item" href="/profil">Profil</a>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>Déconnexion</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
