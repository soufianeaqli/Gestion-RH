import React, { useState, useEffect } from 'react';
import { candidatures } from './Data';
import Notification from './Notification/Notification'; // Import the Notification component

function Recrutement() {
    const [candidats, setCandidats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [newCandidat, setNewCandidat] = useState({ nom: "", poste: "", cv: "" });
    const [editedCandidat, setEditedCandidat] = useState({ id: "", nom: "", poste: "", cv: "" });
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    // Charger les candidats depuis localStorage
    useEffect(() => {
        const storedCandidats = JSON.parse(localStorage.getItem('candidats'));
        if (storedCandidats) {
            setCandidats(storedCandidats);
        }
    }, []);

    // Sauvegarder les candidats dans localStorage lorsque la liste change
    useEffect(() => {
        if (candidats.length > 0) {
            localStorage.setItem('candidats', JSON.stringify(candidats));
        }
    }, [candidats]);

    const openEditModal = (id) => {
        const candidatToEdit = candidats.find((cand) => cand.id === id);
        setEditedCandidat(candidatToEdit);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (id) => {
        setCurrentId(id);
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        setCandidats(candidats.filter((cand) => cand.id !== currentId));
        setIsModalOpen(false);
    };

    const handleAddCandidat = () => {
        if (newCandidat.nom === "" || newCandidat.poste === "" || newCandidat.cv === "") {
            setErrorMessage("Tous les champs doivent être remplis.");
            return;
        }

        const newId = candidats.length ? candidats[candidats.length - 1].id + 1 : 1;
        setCandidats([...candidats, { ...newCandidat, id: newId }]);
        setIsAddModalOpen(false);
        setNewCandidat({ nom: "", poste: "", cv: "" });
        setErrorMessage(''); // Clear error message on success
    };

    const handleEditCandidat = () => {
        if (editedCandidat.nom === "" || editedCandidat.poste === "" || editedCandidat.cv === "") {
            setErrorMessage("Tous les champs doivent être remplis.");
            return;
        }

        setCandidats(candidats.map((cand) => (cand.id === editedCandidat.id ? editedCandidat : cand)));
        setIsEditModalOpen(false);
        setEditedCandidat({ id: "", nom: "", poste: "", cv: "" });
        setErrorMessage(''); // Clear error message on success
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === "add") {
                setNewCandidat({ ...newCandidat, cv: file.name });
            } else if (type === "edit") {
                setEditedCandidat({ ...editedCandidat, cv: file.name });
            }
        }
    };

    return (
        <div>
            <h1>Gestion des Candidatures</h1>
            <button className="btn1" onClick={() => setIsAddModalOpen(true)}>Ajouter une Candidature</button>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Poste</th>
                        <th>CV</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {candidats.map((e, i) => (
                        <tr key={i}>
                            <td>{e.nom}</td>
                            <td>{e.poste}</td>
                            <td>
                                <a href={`/cv/${e.cv}`} download={e.cv} className="download-cv">Télécharger CV</a>
                            </td>
                            <td>
                                <button className="btn-edit" onClick={() => openEditModal(e.id)}>Modifier</button>
                                <button className="btn" onClick={() => openDeleteModal(e.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modale de confirmation de suppression */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Êtes-vous sûr de vouloir supprimer cette candidature ?</p>
                        <div className="modal-actions">
                            <button className="btn-sup" onClick={handleDelete}>Oui</button>
                            <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Non</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modale d'ajout de candidature */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Ajouter une Candidature</h2>
                        <input 
                            type="text" 
                            placeholder="Nom" 
                            value={newCandidat.nom} 
                            onChange={(e) => setNewCandidat({ ...newCandidat, nom: e.target.value })} 
                        />
                        <input 
                            type="text" 
                            placeholder="Poste" 
                            value={newCandidat.poste} 
                            onChange={(e) => setNewCandidat({ ...newCandidat, poste: e.target.value })} 
                        />
                        <label className="file-upload">
                            Choisir un fichier
                            <input 
                                type="file" 
                                onChange={(e) => handleFileChange(e, "add")} 
                            />
                        </label>
                        <button className="btn-ajt" onClick={handleAddCandidat}>Ajouter</button>
                        {errorMessage && (
                            <Notification message={errorMessage} onClose={() => setErrorMessage('')} />
                        )}
                        <button className="btn-annuler" onClick={() => setIsAddModalOpen(false)}>Annuler</button>
                    </div>
                </div>
            )}

            {/* Modale de modification de candidature */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Modifier une Candidature</h2>
                        <input 
                            type="text" 
                            placeholder="Nom" 
                            value={editedCandidat.nom} 
                            onChange={(e) => setEditedCandidat({ ...editedCandidat, nom: e.target.value })} 
                        />
                        <input 
                            type="text" 
                            placeholder="Poste" 
                            value={editedCandidat.poste} 
                            onChange={(e) => setEditedCandidat({ ...editedCandidat, poste: e.target.value })} 
                        />
                        <input 
                            type="text" 
                            placeholder="CV (nom du fichier)" 
                            value={editedCandidat.cv} 
                            onChange={(e) => setEditedCandidat({ ...editedCandidat, cv: e.target.value })} 
                        />
                        <label className="file-upload">
                            Choisir un fichier
                            <input 
                                type="file" 
                                onChange={(e) => handleFileChange(e, "edit")} 
                            />
                        </label>
                        <div className="modal-actions">
                            <button className="btn-edit" onClick={handleEditCandidat}>Modifier</button>
                            <button className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recrutement;
