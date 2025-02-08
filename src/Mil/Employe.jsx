import React, { useState } from "react";
import Notification from './Notification/Notification';
import './Mil.css';

const Employe = ({ employees, addEmployee, removeEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    position: '',
    department: '',
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleAddEmployee = () => {
    if (newEmployee.name === "" || newEmployee.position === "" || newEmployee.department === "") {
      setErrorMessage("Tous les champs doivent être remplis.");
      return;
    }

    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    const updatedEmployee = { 
      ...newEmployee, 
      id: newId, 
      salaire: 0, 
      prime: 0, 
      totalSalaire: 0 
    };

    addEmployee(updatedEmployee); // 🔥 Met à jour globalement via App.js
    setSuccessMessage("Employé ajouté avec succès !");
    setIsAddModalOpen(false);
    setNewEmployee({ id: '', name: '', position: '', department: '' });
  };

  const handleRemove = (id) => {
    setEmployeeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    removeEmployee(employeeToDelete); // 🔥 Met à jour globalement via App.js
    setDeleteMessage("L'employé a été supprimé avec succès !");
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <h1>Tableau des Employés</h1>
      <button className="btn1" onClick={() => setIsAddModalOpen(true)}>
        Ajouter un employé
      </button>

      {errorMessage && <Notification message={errorMessage} onClose={() => setErrorMessage("")} type="error" />}
      {successMessage && <Notification message={successMessage} onClose={() => setSuccessMessage("")} type="success" />}
      {deleteMessage && <Notification message={deleteMessage} onClose={() => setDeleteMessage("")} type="error" />}

      <table border="1">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Poste</th>
            <th>Département</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <button className="btn" onClick={() => handleRemove(employee.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ajouter un Employé</h2>
            <input type="text" name="name" placeholder="Nom" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
            <input type="text" name="position" placeholder="Poste" value={newEmployee.position} onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} />
            <input type="text" name="department" placeholder="Département" value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })} />
            <div className="modal-actions">
              <button className="btn-ajt" onClick={handleAddEmployee}>Ajouter</button>
              <button className="btn-annuler" onClick={() => setIsAddModalOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Êtes-vous sûr de vouloir supprimer cet employé ?</h2>
            <div className="modal-actions">
              <button className="btn-ajt" onClick={confirmDelete}>Confirmer</button>
              <button className="btn-annuler" onClick={() => setIsDeleteModalOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employe;
