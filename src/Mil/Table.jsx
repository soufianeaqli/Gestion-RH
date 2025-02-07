import React from "react";
import './Table.css'; 
import {leaves} from './Data';

const Table = ({ employees, candidatures }) => {
  const totalEmployees = employees.length;
  const pendingLeavesCount = leaves.filter(leave => leave.status === "En attente").length;
  const demandeCandidature = candidatures.length;  // Update this line to use the candidatures prop

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
              <p className="card-text display-4">{demandeCandidature}</p>  {/* Display the updated count */}
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
