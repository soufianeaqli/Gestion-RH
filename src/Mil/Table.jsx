import React from "react";
import './Table.css';

const Table = ({ employees = [], candidaturesCount, pendingLeavesCount = 0 }) => {
  const totalEmployees = employees?.length || 0;


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tableau de Bord</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="card-title">Employés Totaux</h2>
              <p className="card-text display-4">{totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="card-title">Demande de Candidature</h2>
              <p className="card-text display-4">{candidaturesCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h2 className="card-title">Congés en Attente</h2>
              <p className="card-text display-4">{pendingLeavesCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
