import React, { useState } from "react";
import "../css/navbar.css";

function Navbar({ utilisateur }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // pour mobile

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {/* Hamburger mobile */}
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>

          {/* Logo */}
          <span className="navbar-brand">Église</span>
        </div>

        {/* Barre de recherche */}
        <form className="navbar-center">
          <input
            type="search"
            className="form-control"
            placeholder="Rechercher..."
            aria-label="Rechercher"
          />
        </form>

        {/* Dropdown utilisateur */}
        <div className="navbar-right">
          <div className="user-info" onClick={toggleDropdown}>
            <i className="fas fa-user-circle"></i>
            <span className="user-name">
              {utilisateur?.prenom} {utilisateur?.nom}
            </span>
            <i className={`fas fa-caret-down ${dropdownOpen ? "rotate" : ""}`}></i>
          </div>
          {dropdownOpen && (
            <ul className="navbar-dropdown-menu">
              <li><a href="/profil">Profil</a></li>
              <li><button onClick={handleLogout}>Déconnexion</button></li>
            </ul>
          )}
        </div>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="/utilisateurs">Gestion des utilisateurs</a></li>
            <li><a href="/certificat/deces">Certificat de décès</a></li>
            <li><a href="/certificat/naissance">Certificat de naissance</a></li>
            <li><a href="/certificat/mariage">Certificat de mariage</a></li>
          </ul>
        </div>
      )}

      {/* Overlay mobile */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Navbar;
