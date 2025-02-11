import React, { useState, useEffect } from "react";
import './Mil.css';

function Paie({ employees, updateEmployee }) {
  const [pai, setPai] = useState([]);

  // 🟢 Synchroniser `pai` avec `employees`
  useEffect(() => {
    setPai(employees);
  }, [employees]);

  const [isEditSalaire, setIsEditSalaire] = useState(false);
  const [editedSalaire, setEditedSalaire] = useState({
    id: '',
    name: '',
    salaire: '',
    prime: '',
    totalSalaire: ''
  });

  // 🟢 Ouvrir la modale avec les infos actuelles
  const Modifier = (id) => {
    const salaireEdit = pai.find((sal) => sal.id === id);
    setEditedSalaire(salaireEdit);
    setIsEditSalaire(true);
  };

  // 🟢 Mettre à jour le salaire en direct
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSalaire(prevState => {
      const updated = { ...prevState, [name]: value };

      if (name === "salaire" || name === "prime") {
        const salaire = parseFloat(updated.salaire) || 0;
        const prime = parseFloat(updated.prime) || 0;
        updated.totalSalaire = salaire + prime;
      }

      return updated;
    });
  };

  // 🟢 Sauvegarder les changements et mettre à jour globalement
  const handleSave = () => {
    updateEmployee(editedSalaire);
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
          {pai.map((e) => (
            <tr key={e.id}>
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
