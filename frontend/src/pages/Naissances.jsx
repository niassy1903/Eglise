import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import { getUtilisateurs, createNaissance } from "../api/api";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "../css/naissances.css";

const Naissances = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    enfant_nom: "",
    enfant_prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    pere_nom: "",
    pere_prenom: "",
    mere_nom: "",
    mere_prenom: "",
    pretre_id: "",
  });
  const [pretreList, setPretreList] = useState([]);

  // Récupérer les prêtres pour le select
  useEffect(() => {
    getUtilisateurs().then(res => {
      setPretreList(res.data.filter(u => u.role === "pretre"));
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    // Bordure
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);

    // Titre
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Certificat de Naissance", 105, 25, { align: "center" });

    // Sections
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    let y = 50;

    doc.text("Informations sur l'enfant", 20, y); y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Nom : ${form.enfant_nom}`, 20, y); y += 10;
    doc.text(`Prénom : ${form.enfant_prenom}`, 20, y); y += 10;
    doc.text(`Date de naissance : ${form.date_naissance}`, 20, y); y += 10;
    doc.text(`Lieu de naissance : ${form.lieu_naissance}`, 20, y); y += 15;

    doc.setFont("helvetica", "normal");
    doc.text("Informations sur le père", 20, y); y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Nom : ${form.pere_nom}`, 20, y); y += 10;
    doc.text(`Prénom : ${form.pere_prenom}`, 20, y); y += 15;

    doc.setFont("helvetica", "normal");
    doc.text("Informations sur la mère", 20, y); y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Nom : ${form.mere_nom}`, 20, y); y += 10;
    doc.text(`Prénom : ${form.mere_prenom}`, 20, y); y += 15;

    const selectedPretre = pretreList.find(p => p.id === form.pretre_id);
    if (selectedPretre) {
      doc.setFont("helvetica", "normal");
      doc.text("Prêtre ayant enregistré la naissance", 20, y); y += 10;
      doc.setFont("helvetica", "bold");
      doc.text(`${selectedPretre.nom} ${selectedPretre.prenom}`, 20, y); y += 10;
    }

    // Pied de page
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `Document officiel généré le ${new Date().toLocaleDateString()}`,
      105,
      280,
      { align: "center" }
    );

    doc.save(`${form.enfant_nom}_${form.enfant_prenom}_certificat.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNaissance(form);

      // SweetAlert après création
      Swal.fire({
        icon: "success",
        title: "Naissance ajoutée !",
        text: "Voulez-vous imprimer le certificat ?",
        showCancelButton: true,
        confirmButtonText: "Oui, imprimer",
        cancelButtonText: "Non",
        timer: 5000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          generatePDF();
        }
      });

      // Reset du formulaire
      setForm({
        enfant_nom: "",
        enfant_prenom: "",
        date_naissance: "",
        lieu_naissance: "",
        pere_nom: "",
        pere_prenom: "",
        mere_nom: "",
        mere_prenom: "",
        pretre_id: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.response?.data?.message || "Erreur lors de l'ajout de la naissance",
        timer: 5000,
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
            <div className="naissance-form shadow rounded bg-white p-4">
              <h2 className="form-title mb-4">Formulaire Naissance</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom de l'enfant</label>
                    <input
                      type="text"
                      name="enfant_nom"
                      value={form.enfant_nom}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Saisissez le nom de l'enfant"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom de l'enfant</label>
                    <input
                      type="text"
                      name="enfant_prenom"
                      value={form.enfant_prenom}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Saisissez le prénom de l'enfant"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date de naissance</label>
                    <input
                      type="date"
                      name="date_naissance"
                      value={form.date_naissance}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Lieu de naissance</label>
                    <input
                      type="text"
                      name="lieu_naissance"
                      value={form.lieu_naissance}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom du père</label>
                    <input
                      type="text"
                      name="pere_nom"
                      value={form.pere_nom}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom du père</label>
                    <input
                      type="text"
                      name="pere_prenom"
                      value={form.pere_prenom}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom de la mère</label>
                    <input
                      type="text"
                      name="mere_nom"
                      value={form.mere_nom}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom de la mère</label>
                    <input
                      type="text"
                      name="mere_prenom"
                      value={form.mere_prenom}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Prêtre</label>
                  <select
                    name="pretre_id"
                    value={form.pretre_id}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Sélectionner un prêtre</option>
                    {pretreList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nom} {p.prenom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="d-flex justify-content-between gap-3">
                  <button type="submit" className="btn btn-primary flex-fill">
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => navigate("/naissances")}
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

export default Naissances;
