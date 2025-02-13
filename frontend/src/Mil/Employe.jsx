import React, { useState, useEffect } from "react";
import Notification from './Notification/Notification';
import './Mil.css';
import axios from "axios";
import Loading from '../components/Loading';

const Employe = ({ employees, loadingEmployees, addEmployee, removeEmployee, updateEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    position: '',
    department: '',
  });

  // Etat local pour les opérations asynchrones (ex. lors d'un ajout, modification ou suppression)
  const [processing, setProcessing] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ id: '', name: '', position: '', department: '' });

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.department) {
      setErrorMessage("Tous les champs doivent être remplis.");
      return;
    }
    setProcessing(true);

    axios.post("http://localhost:8000/api/employees", {
      name: newEmployee.name,
      position: newEmployee.position,
      department: newEmployee.department,
      salaire: 2500,
      prime: 0,
      totalSalaire: 2500
    })
      .then(response => {
        addEmployee(response.data); // Mise à jour globale via App.js
        setSuccessMessage("Employé ajouté avec succès !");
        setIsAddModalOpen(false);
        setNewEmployee({ id: '', name: '', position: '', department: '' });
        setTimeout(() => { setProcessing(false); }, 500);
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout de l'employé", error.response.data);
        setErrorMessage("Erreur lors de l'ajout de l'employé: " + JSON.stringify(error.response.data));
        setTimeout(() => { setProcessing(false); }, 500);
      });
  };

  const handleRemove = (id) => {
    setEmployeeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setProcessing(true);
    axios.delete(`http://localhost:8000/api/employees/${employeeToDelete}`)
      .then(() => {
        removeEmployee(employeeToDelete); // Mise à jour globale via App.js
        setDeleteMessage("L'employé a été supprimé avec succès !");
        setIsDeleteModalOpen(false);
        setTimeout(() => { setProcessing(false); }, 500);
      })
      .catch(error => {
        console.error("Erreur lors de la suppression de l'employé", error.response.data);
        setErrorMessage("Erreur lors de la suppression de l'employé: " + JSON.stringify(error.response.data));
        setTimeout(() => { setProcessing(false); }, 500);
      });
  };

  // Fonction pour ouvrir la modale d'édition d'un employé
  const openEditModal = (id) => {
    const emp = employees.find(employee => employee.id === id);
    setEditedEmployee(emp);
    setIsEditModalOpen(true);
  };

  const handleEditEmployee = () => {
    if (!editedEmployee.name || !editedEmployee.position || !editedEmployee.department) {
      setErrorMessage("Tous les champs doivent être remplis.");
      return;
    }
    setProcessing(true);

    axios.put(`http://localhost:8000/api/employees/${editedEmployee.id}`, {
      name: editedEmployee.name,
      position: editedEmployee.position,
      department: editedEmployee.department,
      salaire: 2500,
      prime: 0,
      totalSalaire: 2500
    })
      .then(response => {
        updateEmployee(response.data); // Mise à jour globale via App.js
        setSuccessMessage("Employé modifié avec succès !");
        setIsEditModalOpen(false);
        setEditedEmployee({ id: '', name: '', position: '', department: '' });
        setTimeout(() => { setProcessing(false); }, 500);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error("Erreur lors de la modification de l'employé", error.response.data);
          setErrorMessage("Erreur lors de la modification de l'employé: " + JSON.stringify(error.response.data));
        } else {
          console.error("Erreur lors de la modification de l'employé", error);
          setErrorMessage("Erreur lors de la modification de l'employé");
        }
        setTimeout(() => { setProcessing(false); }, 500);
      });
  };

  return (
    <div>
      <h1>Tableau des Employés</h1>
      {loadingEmployees ? (
        <Loading message="Chargement des employés..." />
      ) : processing ? (
        <Loading message="Opération en cours..." />
      ) : (
        <>
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
                    <button className="btn-edit" onClick={() => openEditModal(employee.id)}>Modifier</button>
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

          {/* Modale de modification d'employé */}
          {isEditModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h2>Modifier un Employé</h2>
                <input
                  type="text"
                  placeholder="Nom"
                  value={editedEmployee.name}
                  onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Poste"
                  value={editedEmployee.position}
                  onChange={(e) => setEditedEmployee({ ...editedEmployee, position: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Département"
                  value={editedEmployee.department}
                  onChange={(e) => setEditedEmployee({ ...editedEmployee, department: e.target.value })}
                />
                <div className="modal-actions">
                  <button className="btn-edit" onClick={handleEditEmployee}>Modifier</button>
                  <button className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>Annuler</button>
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
                  <button className="btn-annuler" onClick={() => setIsDeleteModalOpen(false)}>Annuler</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Employe;
