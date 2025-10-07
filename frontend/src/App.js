import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Utilisateurs from "./pages/Utilisateurs";
import Inscription from "./pages/Inscription";

function App() {
  return (
    <Router>
      <Routes>
        {/* Page de connexion par défaut */}
        <Route path="/" element={<Login />} />

        {/* Autres pages après login */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/utilisateurs" element={<Utilisateurs />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </Router>
  );
}

export default App;
