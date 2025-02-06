import React, { useState } from "react";
import "./Mil.css";
import { paie } from "./Data";

function Paie() {
    const [pai, setPai] = useState(paie);
    const [isEditSalaire, setIsEditSalaire] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [showLabels, setShowLabels] = useState(false);

    const [editedSalaire, setEditedSalaire] = useState({
        id: '',
        name: '',
        salaire: '',
        prime: '',
        totalSalaire: ''
    });

    const [newEmployee, setNewEmployee] = useState({
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
        setShowLabels(true); 
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
        setShowLabels(false);
    };

   
    const openAddModal = () => {
        setIsAddModalOpen(true);
        setShowLabels(true);
    };

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        const updatedEmployee = { ...newEmployee, [name]: value };

        if (name === "salaire" || name === "prime") {
            const salaire = parseFloat(updatedEmployee.salaire) || 0;
            const prime = parseFloat(updatedEmployee.prime) || 0;
            updatedEmployee.totalSalaire = salaire + prime;
        }

        setNewEmployee(updatedEmployee);
    };

    // Ajouter un nouvel employé
    const handleAddEmployee = () => {
        const newId = pai.length ? pai[pai.length - 1].id + 1 : 1;
        setPai([...pai, { ...newEmployee, id: newId }]);
        setIsAddModalOpen(false);
        setShowLabels(false); // Cacher les labels après ajout
        setNewEmployee({ id: '', name: '', salaire: '', prime: '', totalSalaire: '' });
    };

    return (
        <div>
            <h1>Tableau des Salaires</h1>
            <button className="btn3" onClick={openAddModal}>Ajouter un employé</button>
            <table border="1">
                <thead>
                    <tr>
                        
                        <th>Employé</th>
                        <th>Salaire</th>
                        <th>Prime</th>
                        <th>Total Salaire</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pai.map((e, i) => (
                        <tr key={i}>
                            
                            <td>{e.name}</td>
                            <td>{e.salaire}</td>
                            <td>{e.prime}</td>
                            <td>{e.totalSalaire}</td>
                            <td>
                                <button className="btn4" onClick={() => Modifier(e.id)}>Modifier</button>
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

                        {showLabels && <label>Salaire :</label>}
                        <input
                            type="number"
                            name="salaire"
                            placeholder="Salaire"
                            value={editedSalaire.salaire}
                            onChange={handleInputChange}
                        />

                        {showLabels && <label>Prime :</label>}
                        <input
                            type="number"
                            name="prime"
                            placeholder="Prime"
                            value={editedSalaire.prime}
                            onChange={handleInputChange}
                        />

                        <div className="modal-actions">
                            <button className="btn-edit" onClick={handleSave}>Modifier</button>
                            <button className="btn-cancel" onClick={() => { setIsEditSalaire(false); setShowLabels(false); }}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modale d'ajout d'un employé */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Ajouter un Employé</h2>

                        {showLabels && <label>Nom :</label>}
                        <input
                            type="text"
                            name="name"
                            placeholder="Nom de l'employé"
                            value={newEmployee.name}
                            onChange={handleNewInputChange}
                        />

                        {showLabels && <label>Salaire :</label>}
                        <input
                            type="number"
                            name="salaire"
                            placeholder="Salaire"
                            value={newEmployee.salaire}
                            onChange={handleNewInputChange}
                        />

                        {showLabels && <label>Prime :</label>}
                        <input
                            type="number"
                            name="prime"
                            placeholder="Prime"
                            value={newEmployee.prime}
                            onChange={handleNewInputChange}
                        />

                        <div className="modal-actions">
                            <button className="btn-ajt" onClick={handleAddEmployee}>Ajouter</button>
                            <button className="btn-annuler" onClick={() => { setIsAddModalOpen(false); setShowLabels(false); }}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Paie;