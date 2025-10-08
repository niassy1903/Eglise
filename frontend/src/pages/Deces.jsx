import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import { getUtilisateurs, createDeces } from "../api/api";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "../css/deces.css";

const Deces = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    date_deces: "",
    lieu_deces: "",
    cause_deces: "",
    pere_nom: "",
    pere_prenom: "",
    mere_nom: "",
    mere_prenom: "",
    pretre_id: "",
  });
  const [pretreList, setPretreList] = useState([]);

  useEffect(() => {
    getUtilisateurs().then(res => {
      setPretreList(res.data.filter(u => u.role === "pretre"));
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Certificat de Décès", 105, 25, { align: "center" });

    let y = 50;
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");

    doc.text(`Nom : ${form.nom}`, 20, y); y += 10;
    doc.text(`Prénom : ${form.prenom}`, 20, y); y += 10;
    doc.text(`Date du décès : ${form.date_deces}`, 20, y); y += 10;
    doc.text(`Lieu du décès : ${form.lieu_deces}`, 20, y); y += 10;
    doc.text(`Cause du décès : ${form.cause_deces}`, 20, y); y += 15;

    doc.text("Informations sur les parents :", 20, y); y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Père : ${form.pere_nom} ${form.pere_prenom}`, 20, y); y += 10;
    doc.text(`Mère : ${form.mere_nom} ${form.mere_prenom}`, 20, y); y += 15;

    const selectedPretre = pretreList.find(p => p.id === form.pretre_id);
    if (selectedPretre) {
      doc.setFont("helvetica", "normal");
      doc.text("Prêtre ayant célébré la cérémonie :", 20, y); y += 10;
      doc.setFont("helvetica", "bold");
      doc.text(`${selectedPretre.nom} ${selectedPretre.prenom}`, 20, y); y += 10;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `Document officiel généré le ${new Date().toLocaleDateString()}`,
      105,
      280,
      { align: "center" }
    );

    doc.save(`${form.nom}_${form.prenom}_deces.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDeces(form);

      Swal.fire({
        icon: "success",
        title: "Décès ajouté !",
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

      setForm({
        nom: "",
        prenom: "",
        date_deces: "",
        lieu_deces: "",
        cause_deces: "",
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
        text: err.response?.data?.message || "Erreur lors de l'ajout du décès",
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
            <div className="deces-form shadow rounded bg-white p-4">
              <h2 className="form-title mb-4">Formulaire Décès</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Saisissez le nom"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={form.prenom}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Saisissez le prénom"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date du décès</label>
                    <input
                      type="date"
                      name="date_deces"
                      value={form.date_deces}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Lieu du décès</label>
                    <input
                      type="text"
                      name="lieu_deces"
                      value={form.lieu_deces}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Cause du décès</label>
                    <input
                      type="text"
                      name="cause_deces"
                      value={form.cause_deces}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
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
                </div>

                <div className="row">
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
                </div>

                <div className="row mb-4">
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
                  <div className="col-md-6 mb-3">
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
                </div>

                <div className="d-flex justify-content-between gap-3">
                  <button type="submit" className="btn btn-primary flex-fill">
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => navigate("/deces")}
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

export default Deces;
