import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Utilisateurs from "./pages/Utilisateurs";
import Inscription from "./pages/Inscription";
import Deces from "./pages/Deces";
import Naissances from "./pages/Naissances";
import Mariages from "./pages/Mariages";
import Edit from "./pages/Edit";
import ProtectedRoute from "./composants/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Page de connexion */}
        <Route path="/" element={<Login />} />

        {/* Dashboard accessible à tous */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Gestion utilisateurs → uniquement admin */}
        <Route
          path="/utilisateurs"
          element={
            <ProtectedRoute rolesAllowed={["admin"]}>
              <Utilisateurs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inscription"
          element={
            <ProtectedRoute rolesAllowed={["admin"]}>
              <Inscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute rolesAllowed={["admin"]}>
              <Edit />
            </ProtectedRoute>
          }
        />

        {/* Gestion certificats → uniquement prêtre */}
        <Route
          path="/deces"
          element={
            <ProtectedRoute rolesAllowed={["pretre"]}>
              <Deces />
            </ProtectedRoute>
          }
        />
        <Route
          path="/naissance"
          element={
            <ProtectedRoute rolesAllowed={["pretre"]}>
              <Naissances />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mariage"
          element={
            <ProtectedRoute rolesAllowed={["pretre"]}>
              <Mariages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
