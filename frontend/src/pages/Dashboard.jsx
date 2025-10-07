import React from "react";
import DashboardLayout from "../composants/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import "../css/dashboard.css";

const Dashboard = () => {
  const barData = [
    { name: "Naissance", value: 120 },
    { name: "Mariage", value: 90 },
    { name: "Décès", value: 50 },
  ];

  const pieData = [
    { name: "Admin", value: 8 },
    { name: "Prêtre", value: 5 },
  ];

  const COLORS = ["#ff8000", "#00c49f"];

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">Tableau de bord</h1>

      {/* Cards */}
      <div className="cards-container">
        <div className="card-item">
          <h2>Certificats de naissance</h2>
          <p>120</p>
        </div>
        <div className="card-item">
          <h2>Certificats de mariage</h2>
          <p>90</p>
        </div>
        <div className="card-item">
          <h2>Certificats de décès</h2>
          <p>50</p>
        </div>
        <div className="card-item">
          <h2>Administrateurs</h2>
          <p>8</p>
        </div>
        <div className="card-item">
          <h2>Prêtres</h2>
          <p>5</p>
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
    </DashboardLayout>
  );
};

export default Dashboard;
