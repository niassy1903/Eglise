import React, { useEffect, useState } from "react";
import Sidebar from "../composants/Sidebar";
import Navbar from "../composants/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  countAdmins,
  countPretres,
  countNaissances,
  countMariages,
  countDeces
} from "../api/api";
import "../css/dashboard.css";

const Dashboard = () => {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  const [counts, setCounts] = useState({
    admins: 0,
    pretres: 0,
    naissances: 0,
    mariages: 0,
    deces: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          adminsRes,
          pretresRes,
          naissancesRes,
          mariagesRes,
          decesRes
        ] = await Promise.all([
          countAdmins(),
          countPretres(),
          countNaissances(),
          countMariages(),
          countDeces()
        ]);

        setCounts({
          admins: adminsRes.data.admins,
          pretres: pretresRes.data.pretres,
          naissances: naissancesRes.data.naissances,
          mariages: mariagesRes.data.mariages,
          deces: decesRes.data.deces
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  // Données pour les graphiques
  const barData = [
    { name: "Naissances", value: counts.naissances },
    { name: "Mariages", value: counts.mariages },
    { name: "Décès", value: counts.deces }
  ];

  const pieData = [
    { name: "Admins", value: counts.admins },
    { name: "Prêtres", value: counts.pretres }
  ];

  const COLORS = ["#ff8000", "#00c49f"];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar utilisateur={utilisateur} />

        <div className="content">
          <h1 className="dashboard-title">Tableau de bord</h1>

          {/* Cards */}
          <div className="cards-container">
            <div className="card-item">
              <h2>Certificats de naissance</h2>
              <p>{counts.naissances}</p>
            </div>
            <div className="card-item">
              <h2>Certificats de mariage</h2>
              <p>{counts.mariages}</p>
            </div>
            <div className="card-item">
              <h2>Certificats de décès</h2>
              <p>{counts.deces}</p>
            </div>
            <div className="card-item">
              <h2>Administrateurs</h2>
              <p>{counts.admins}</p>
            </div>
            <div className="card-item">
              <h2>Prêtres</h2>
              <p>{counts.pretres}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-section">
            <div className="chart-card">
              <h3>Certificats enregistrés</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ff8000" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Répartition du personnel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
