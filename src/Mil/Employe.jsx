import React, { useState } from "react";
import './Mil.css';
import { employers } from './Data';

const Employe = () => {
  const [employees, setEmployees] = useState(employers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // Modal pour la modification
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    position: '',
    department: '',
  });
  const [editedEmployee, setEditedEmployee] = useState({
    id: '',
    name: '',
    position: '',
    department: '',
  });

  const openModal = (id) => {
    setCurrentEmployeeId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployeeId(null);
  };

  const handleDelete = () => {
    setEmployees(employees.filter((e) => e.id !== currentEmployeeId));
    closeModal();
  };

  const handleAddEmployee = () => {
    const newId = employees.length ? employees[employees.length - 1].id + 1 : 1;
    setEmployees([...employees, { ...newEmployee, id: newId }]);
    setIsAddModalOpen(false);
    setNewEmployee({ id: '', name: '', position: '', department: '' });
  };

  const handleEditEmployee = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === editedEmployee.id ? editedEmployee : emp
      )
    );
    setIsEditModalOpen(false);
    setEditedEmployee({
      id: '',
      name: '',
      position: '',
      department: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };

  const openEditModal = (id) => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    setEditedEmployee(employeeToEdit);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <h1>Tableau des Employés</h1>
      <button className="btn3" onClick={() => setIsAddModalOpen(true)}>
        Ajouter un employé
      </button>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Poste</th>
            <th>Département</th>
            <th>Action</th>
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
                <button
                  className="btn4"
                  onClick={() => openEditModal(employee.id)}
                >
                  Modifier
                </button>
                <button
                  className="btn"
                  onClick={() => openModal(employee.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale de confirmation de suppression */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
            <div className="modal-actions">
              <button className="btn-sup" onClick={handleDelete}>
                Oui
              </button>
              <button className="btn-cancel" onClick={closeModal}>
                Non
              </button>
            </div>
          </div>
        </div>
      )}

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
              <button className="btn" onClick={handleAddEmployee}>
                Ajouter
              </button>
              <button
                className="btn-cancel"
                onClick={() => setIsAddModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de modification d'employé */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifier l'Employé</h2>
            <input
              type="text"
              name="name"
              placeholder="Nom de l'employé"
              value={editedEmployee.name}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              name="position"
              placeholder="Poste"
              value={editedEmployee.position}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Département"
              value={editedEmployee.department}
              onChange={handleEditInputChange}
            />
            <div className="modal-actions">
              <button className="btn-edit" onClick={handleEditEmployee}>
                Edit
              </button>
              <button
                className="btn-cancel"
                onClick={() => setIsEditModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employe;
