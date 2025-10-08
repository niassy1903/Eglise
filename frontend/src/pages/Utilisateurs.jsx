import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import { getUtilisateurs, deleteUtilisateur } from "../api/api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/utilisateurs.css";

const Utilisateurs = () => {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch utilisateurs
  const fetchUtilisateurs = async () => {
    try {
      const res = await getUtilisateurs();
      setUtilisateurs(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  // Sélection
  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === utilisateurs.length) {
      setSelected([]);
    } else {
      setSelected(utilisateurs.map(u => u.id));
    }
  };

  // Suppression avec SweetAlert2
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        await deleteUtilisateur(id);
        setUtilisateurs(prev => prev.filter(u => u.id !== id));
        setSelected(prev => prev.filter(x => x !== id));

        Swal.fire({
          title: "Supprimé !",
          text: "L'utilisateur a été supprimé.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        Swal.fire({
          title: "Erreur",
          text: "La suppression a échoué.",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    }
  };

  // Filtrage
  const filteredUsers = useMemo(() => {
    return utilisateurs.filter(u =>
      `${u.nom} ${u.prenom} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [utilisateurs, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar utilisateur={utilisateur} />
        <div className="content">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Liste des utilisateurs</h2>
            <Link to="/inscription" className="btn btn-primary">
              <i className="bi bi-person-plus-fill"></i> Ajouter un utilisateur
            </Link>
          </div>

          <div className="top-bar">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {selected.length > 0 && (
              <div className="selected-info">✅ {selected.length} sélectionné(s)</div>
            )}
          </div>

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selected.length === utilisateurs.length && utilisateurs.length > 0}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Situation</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.length === 0 ? (
                      <tr>
                        <td colSpan="7">Aucun utilisateur trouvé</td>
                      </tr>
                    ) : (
                      paginatedUsers.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selected.includes(u.id)}
                              onChange={() => toggleSelect(u.id)}
                            />
                          </td>
                          <td>{u.nom}</td>
                          <td>{u.prenom}</td>
                          <td>{u.email}</td>
                          <td>{u.telephone || "-"}</td>
                          <td>
                            <span className={`status ${u.situation_matrimoniale === "Marié" ? "fulltime" : "parttime"}`}>
                              {u.situation_matrimoniale}
                            </span>
                          </td>
                          <td className="actions">
                            <button className="icon-btn info" title="Voir">
                              <i className="bi bi-eye-fill"></i>
                            </button>
                            <Link
                              to={`/edit/${u.id}`}
                              className="icon-btn edit"
                              title="Modifier"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                            <button
                              className="icon-btn delete"
                              onClick={() => handleDelete(u.id)}
                              title="Supprimer"
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pagination mt-3 d-flex justify-content-center gap-2">
                <button className="btn btn-sm btn-primary" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    className={`btn btn-sm ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button className="btn btn-sm btn-primary" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Utilisateurs;
