import React, { useState } from "react";
import "./Mil.css";

function Paie({ employees }) {
  const [pai, setPai] = useState(employees);
  const [isEditSalaire, setIsEditSalaire] = useState(false);
  const [editedSalaire, setEditedSalaire] = useState({
    id: '',
    name: '',
    salaire: '',
    prime: '',
    totalSalaire: ''
  });

  const Modifier = (id) => {
    const salaireEdit = pai.find((sal) => sal.id === id);
    setEditedSalaire(salaireEdit);
    setIsEditSalaire(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedSalaire = { ...editedSalaire, [name]: value };

    if (name === "salaire" || name === "prime") {
      const salaire = parseFloat(updatedSalaire.salaire) || 0;
      const prime = parseFloat(updatedSalaire.prime) || 0;
      updatedSalaire.totalSalaire = salaire + prime;
    }

    setEditedSalaire(updatedSalaire);
  };

  const handleSave = () => {
    setPai(pai.map((sal) => (sal.id === editedSalaire.id ? editedSalaire : sal)));
    setIsEditSalaire(false);
  };

  return (
    <div>
      <h1>Tableau des Salaires</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Employé</th>
            <th>Salaire</th>
            <th>Prime</th>
            <th>Total Salaire</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pai.map((e, i) => (
            <tr key={i}>
              <td>{e.name}</td>
              <td>{e.salaire} dh</td>
              <td>{e.prime} dh</td>
              <td>{e.totalSalaire} dh</td>
              <td>
                <button className="btn4" onClick={() => Modifier(e.id)}>
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale de modification du salaire */}
      {isEditSalaire && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier le Salaire</h2>
            <input
              type="number"
              name="salaire"
              placeholder="Salaire"
              value={editedSalaire.salaire}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="prime"
              placeholder="Prime"
              value={editedSalaire.prime}
              onChange={handleInputChange}
            />
            <div className="modal-actions">
              <button className="btn-edit" onClick={handleSave}>
                Modifier
              </button>
              <button
                className="btn-cancel"
                onClick={() => setIsEditSalaire(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Paie;
