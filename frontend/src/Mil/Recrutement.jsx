import React, { useState, useEffect } from 'react';
import Notification from './Notification/Notification';
import axios from 'axios';

function Recrutement({ updateCandidaturesCount }) {
    const [candidats, setCandidats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [newCandidat, setNewCandidat] = useState({ nom: "", poste: "", cv: "" });
    const [editedCandidat, setEditedCandidat] = useState({ id: "", nom: "", poste: "", cv: "" });
    const [errorMessage, setErrorMessage] = useState('');
    // Etat local pour les opérations asynchrones (ajout, édition, suppression)
    const [processing, setProcessing] = useState(false);

    // Charger les candidatures depuis l'API au démarrage
    useEffect(() => {
        axios.get("http://localhost:8000/api/candidats")
            .then(response => {
                setCandidats(response.data);
                updateCandidaturesCount(response.data.length);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des candidats", error);
                setLoading(false);
            });
    }, []);

    // Mise à jour du compteur via l'état 'candidats'
    useEffect(() => {
        updateCandidaturesCount(candidats.length);
    }, [candidats, updateCandidaturesCount]);

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
        setProcessing(true);
        axios.delete(`http://localhost:8000/api/candidats/${currentId}`)
            .then(() => {
                const updatedCandidats = candidats.filter((cand) => cand.id !== currentId);
                setCandidats(updatedCandidats);
                setIsModalOpen(false);
                setTimeout(() => { setProcessing(false); }, 500);
            })
            .catch(error => {
                console.error("Erreur lors de la suppression de la candidature", error);
                setErrorMessage("Erreur lors de la suppression de la candidature");
                setTimeout(() => { setProcessing(false); }, 500);
            });
    };

    const handleAddCandidat = () => {
        if (!newCandidat.nom || !newCandidat.poste || !newCandidat.cv) {
            setErrorMessage("Tous les champs doivent être remplis.");
            return;
        }
        setProcessing(true);

        // Création d'un FormData pour envoyer le fichier et les autres données
        const formData = new FormData();
        formData.append("nom", newCandidat.nom);
        formData.append("poste", newCandidat.poste);
        formData.append("cv", newCandidat.cv);

        axios.post("http://localhost:8000/api/candidats", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(response => {
                setCandidats([...candidats, response.data]);
                setIsAddModalOpen(false);
                setNewCandidat({ nom: "", poste: "", cv: "" });
                setErrorMessage('');
                setTimeout(() => { setProcessing(false); }, 500);
            })
            .catch(error => {
                console.error("Erreur lors de la création de la candidature", error.response?.data || error);
                setErrorMessage("Erreur lors de la création de la candidature: " + JSON.stringify(error.response?.data || error));
                setTimeout(() => { setProcessing(false); }, 500);
            });
    };

    const handleEditCandidat = () => {
        if (!editedCandidat.nom || !editedCandidat.poste || !editedCandidat.cv) {
            setErrorMessage("Tous les champs doivent être remplis.");
            return;
        }
        // Masquer immédiatement la modale de modification
        setIsEditModalOpen(false);
        setProcessing(true);
        axios.put(`http://localhost:8000/api/candidats/${editedCandidat.id}`, editedCandidat)
            .then(response => {
                const updatedCandidats = candidats.map((cand) =>
                    cand.id === editedCandidat.id ? response.data : cand
                );
                setCandidats(updatedCandidats);
                setEditedCandidat({ id: "", nom: "", poste: "", cv: "" });
                setErrorMessage('');
                setTimeout(() => { setProcessing(false); }, 500);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de la candidature", error);
                setErrorMessage("Erreur lors de la mise à jour de la candidature");
                setTimeout(() => { setProcessing(false); }, 500);
            });
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === "add") {
                setNewCandidat({ ...newCandidat, cv: file });
            } else if (type === "edit") {
                setEditedCandidat({ ...editedCandidat, cv: file });
            }
        }
    };

    return (
        <div>
            <h1>Gestion des Candidatures</h1>
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Chargement des candidatures...</p>
                </div>
            ) : processing ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Opération en cours...</p>
                </div>
            ) : (
                <>
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
                </>
            )}

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
                            <input type="file" onChange={(e) => handleFileChange(e, "add")} />
                        </label>
                        <button className="btn-ajt" onClick={handleAddCandidat}>Ajouter</button>
                        {errorMessage && <Notification message={errorMessage} onClose={() => setErrorMessage('')} />}
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
                        <label className="file-upload">
                            Choisir un fichier
                            <input type="file" onChange={(e) => handleFileChange(e, "edit")} />
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
