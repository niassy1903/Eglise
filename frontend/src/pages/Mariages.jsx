import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import { getUtilisateurs, createMariage } from "../api/api";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "../css/mariages.css";

const Mariages = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    conjoint1_nom: "",
    conjoint1_prenom: "",
    conjoint2_nom: "",
    conjoint2_prenom: "",
    date_mariage: "",
    lieu_mariage: "",
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
    doc.text("Certificat de Mariage", 105, 25, { align: "center" });

    let y = 50;
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");

    doc.text("Informations sur le conjoint 1", 20, y); y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Nom : ${form.conjoint1_nom}`, 20, y); y += 10;
    doc.text(`Prénom : ${form.conjoint1_prenom}`, 20, y); y += 15;

    doc.setFont("helvetica", "normal");
    doc.text("Informations sur le conjoint 2", 20, y); y += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Nom : ${form.conjoint2_nom}`, 20, y); y += 10;
    doc.text(`Prénom : ${form.conjoint2_prenom}`, 20, y); y += 15;

    doc.setFont("helvetica", "normal");
    doc.text(`Date du mariage : ${form.date_mariage}`, 20, y); y += 10;
    doc.text(`Lieu du mariage : ${form.lieu_mariage}`, 20, y); y += 15;

    const selectedPretre = pretreList.find(p => p.id === form.pretre_id);
    if (selectedPretre) {
      doc.setFont("helvetica", "normal");
      doc.text("Prêtre ayant célébré le mariage", 20, y); y += 10;
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

    doc.save(`${form.conjoint1_nom}_${form.conjoint2_nom}_mariage.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMariage(form);

      Swal.fire({
        icon: "success",
        title: "Mariage enregistré !",
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
        conjoint1_nom: "",
        conjoint1_prenom: "",
        conjoint2_nom: "",
        conjoint2_prenom: "",
        date_mariage: "",
        lieu_mariage: "",
        pretre_id: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: err.response?.data?.message || "Erreur lors de l'enregistrement",
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
            <div className="mariages-form shadow rounded bg-white p-4">
              <h2 className="form-title mb-4">Formulaire Mariage</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom du conjoint 1</label>
                    <input
                      type="text"
                      name="conjoint1_nom"
                      value={form.conjoint1_nom}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Nom du conjoint 1"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom du conjoint 1</label>
                    <input
                      type="text"
                      name="conjoint1_prenom"
                      value={form.conjoint1_prenom}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Prénom du conjoint 1"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom du conjoint 2</label>
                    <input
                      type="text"
                      name="conjoint2_nom"
                      value={form.conjoint2_nom}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Nom du conjoint 2"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prénom du conjoint 2</label>
                    <input
                      type="text"
                      name="conjoint2_prenom"
                      value={form.conjoint2_prenom}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Prénom du conjoint 2"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date du mariage</label>
                    <input
                      type="date"
                      name="date_mariage"
                      value={form.date_mariage}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Lieu du mariage</label>
                    <input
                      type="text"
                      name="lieu_mariage"
                      value={form.lieu_mariage}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Lieu du mariage"
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
                    onClick={() => navigate("/mariages")}
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

export default Mariages;
