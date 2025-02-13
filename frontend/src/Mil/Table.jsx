import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import './Table.css';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Table = ({ employees = [], candidaturesCount = 0, pendingLeavesCount = 0 }) => {
  const totalEmployees = employees.length || 0;
  const total = totalEmployees + candidaturesCount + pendingLeavesCount;

  // Données pour le graphique
  const data = [
    { name: "Employés", value: totalEmployees, color: COLORS[0] },
    { name: "Candidatures", value: candidaturesCount, color: COLORS[1] },
    { name: "Congés", value: pendingLeavesCount, color: COLORS[2] },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tableau de Bord</h1>
      <div className="chart-wrapper">
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={180}
            paddingAngle={3}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <div className="chart-total">
          <h2>Total</h2>
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
};

export default Table;
