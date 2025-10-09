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
import { FaUsers, FaBaby, FaHeart, FaSkull } from "react-icons/fa";
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
    utilisateurs: 0,
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
          utilisateurs: adminsRes.data.admins + pretresRes.data.pretres,
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

  const barData = [
    { name: "Naissances", value: counts.naissances },
    { name: "Mariages", value: counts.mariages },
    { name: "Décès", value: counts.deces }
  ];

  const pieData = [
    { name: "Utilisateurs", value: counts.utilisateurs },
  ];

  const COLORS = ["#007bff"];

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
              <FaBaby className="card-icon" />
              <h2>Naissances</h2>
              <p>{counts.naissances}</p>
            </div>
            <div className="card-item">
              <FaHeart className="card-icon" />
              <h2>Mariages</h2>
              <p>{counts.mariages}</p>
            </div>
            <div className="card-item">
              <FaSkull className="card-icon" />
              <h2>Décès</h2>
              <p>{counts.deces}</p>
            </div>
            <div className="card-item">
              <FaUsers className="card-icon" />
              <h2>Utilisateurs</h2>
              <p>{counts.utilisateurs}</p>
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
                  <Bar dataKey="value" fill="#007bff" radius={[5, 5, 0, 0]} />
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
