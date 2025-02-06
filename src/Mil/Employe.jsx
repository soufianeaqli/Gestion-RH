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
  const [successMessage, setSuccessMessage] = useState(""); // Message de succès pour l'ajout
  const [deleteMessage, setDeleteMessage] = useState(""); // Message de suppression
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Gérer l'ouverture de la modale de suppression
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Stocker l'employé à supprimer

  const handleAddEmployee = () => {
    if (newEmployee.name === "" || newEmployee.position === "" || newEmployee.department === "") {
      setErrorMessage("Tous les champs doivent être remplis.");
      return;
    }

    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    addEmployee({ ...newEmployee, id: newId, salaire: 0, prime: 0, totalSalaire: 0 });
    setSuccessMessage("Employé ajouté avec succès !");
    setIsAddModalOpen(false);
    setNewEmployee({ id: '', name: '', position: '', department: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  const closeDeleteMessage = () => {
    setDeleteMessage("");
  };

  // Fonction de suppression d'employé
  const handleRemove = (id) => {
    setEmployeeToDelete(id); // Stocke l'employé à supprimer
    setIsDeleteModalOpen(true); // Ouvre la modale de confirmation
  };

  // Confirmer la suppression
  const confirmDelete = () => {
    removeEmployee(employeeToDelete); // Supprime l'employé
    setDeleteMessage("L'employé a été supprimé avec succès !");
    setIsDeleteModalOpen(false); // Ferme la modale de confirmation
  };

  // Annuler la suppression
  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Ferme la modale de confirmation sans supprimer
  };

  // Fonction pour annuler l'ajout et réinitialiser les champs
  const cancelAddEmployee = () => {
    setIsAddModalOpen(false); // Fermer la modale d'ajout
    setNewEmployee({ id: '', name: '', position: '', department: '' }); // Réinitialiser les champs
  };

  return (
    <div>
      <h1>Tableau des Employés</h1>
      <button className="btn1" onClick={() => setIsAddModalOpen(true)}>
        Ajouter un employé
      </button>
      {errorMessage && (
        <Notification message={errorMessage} onClose={closeErrorMessage} type="error" />
      )}
      {successMessage && (
        <Notification message={successMessage} onClose={closeSuccessMessage} type="success" />
      )}
      {deleteMessage && (
        <Notification message={deleteMessage} onClose={closeDeleteMessage} type="error" /> 
      )}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Poste</th>
            <th>Département</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
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

      {/* Modale d'ajout d'employé */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Ajouter un Employé</h2>
            <input
              type="text"
              name="name"
              placeholder="Nom de l'employé"
              value={newEmployee.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="position"
              placeholder="Poste"
              value={newEmployee.position}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Département"
              value={newEmployee.department}
              onChange={handleInputChange}
            />
            <div className="modal-actions">
              <button className="btn-ajt" onClick={handleAddEmployee}>
                Ajouter
              </button>
              <button
                className="btn-annuler"
                onClick={cancelAddEmployee}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Êtes-vous sûr de vouloir supprimer cet employé ?</h2>
            <div className="modal-actions">
              <button className="btn-ajt" onClick={confirmDelete}>Confirmer</button>
              <button className="btn-annuler" onClick={cancelDelete}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employe;
