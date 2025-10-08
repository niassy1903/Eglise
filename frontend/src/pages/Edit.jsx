import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import { getUtilisateur, updateUtilisateur } from "../api/api";
import Swal from "sweetalert2";
import "../css/inscription.css";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // récupère l'id depuis l'URL

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    adresse: "",
    telephone: "",
    email: "",
    role: "admin",
    mot_de_passe: "",
    situation_matrimoniale: "celibataire",
    date_naissance: "",
    prenom_papa: "",
    nom_papa: "",
    prenom_maman: "",
    nom_maman: "",
  });

  // Fetch des données de l'utilisateur
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUtilisateur(id);
        setForm(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUtilisateur(id, form);

      Swal.fire({
        icon: "success",
        title: "Utilisateur mis à jour avec succès !",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setTimeout(() => navigate("/utilisateurs"), 3000);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erreur lors de la mise à jour",
        text: err.response?.data?.message || "",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content p-4">
          <div className="container">
            <div className="inscription-form shadow rounded bg-white p-4">
              <h2 className="form-title mb-4">Modifier l'utilisateur</h2>
              <form onSubmit={handleSubmit}>
                {/* ==== Champs du formulaire ==== */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                {/* ==== Adresse / Téléphone ==== */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Adresse</label>
                    <input
                      type="text"
                      name="adresse"
                      value={form.adresse}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="text"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* ==== Email / Mot de passe ==== */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      name="mot_de_passe"
                      value={form.mot_de_passe}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* ==== Sélections ==== */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Rôle</label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="admin">Admin</option>
                      <option value="pretre">Prêtre</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Situation matrimoniale</label>
                    <select
                      name="situation_matrimoniale"
                      value={form.situation_matrimoniale}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="celibataire">Célibataire</option>
                      <option value="marie">Marié(e)</option>
                      <option value="divorce">Divorcé(e)</option>
                      <option value="veuf">Veuf(ve)</option>
                    </select>
                  </div>
                </div>

                {/* ==== Date naissance ==== */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date de naissance</label>
                    <input
                      type="date"
                      name="date_naissance"
                      value={form.date_naissance}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* ==== Parents ==== */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom du père</label>
                    <input
                      type="text"
                      name="prenom_papa"
                      value={form.prenom_papa}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom du père</label>
                    <input
                      type="text"
                      name="nom_papa"
                      value={form.nom_papa}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom de la mère</label>
                    <input
                      type="text"
                      name="prenom_maman"
                      value={form.prenom_maman}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom de la mère</label>
                    <input
                      type="text"
                      name="nom_maman"
                      value={form.nom_maman}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* ==== Boutons ==== */}
                <div className="d-flex justify-content-between gap-3">
                  <button type="submit" className="btn btn-primary flex-fill">
                    Mettre à jour
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => navigate("/utilisateurs")}
                  >
                    Retour
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
