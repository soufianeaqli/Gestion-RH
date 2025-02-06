import React, { useState } from 'react';
import './Recrutement.css';
import { Recrute } from './Data';

function Recrutement() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", cv: null });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleApply = (job) => {
        setSelectedJob(job);
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.cv) {
            setErrorMessage("Veuillez remplir tous les champs et ajouter un CV.");
            return;
        }

        // Cacher le formulaire et afficher uniquement le message de succès
        setSelectedJob(null);
        setSuccessMessage(" Merci pour votre demande !");
        
        // Réinitialiser le message après 3 secondes
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        setFormData({ name: "", email: "", cv: null });
    };

    return (
        <div className="recrutement-container">
            <h1>Recrutement</h1>

            {Recrute.map((e, i) => (
                <div className="job-card" key={i}>
                    <p><strong>{e.title}</strong></p>
                    <p>{e.description}</p>
                    <button onClick={() => handleApply(e)}>Postuler</button>
                </div>
            ))}

            {selectedJob && !successMessage && ( // Masquer le formulaire si successMessage est affiché
                <div className="modal">
                    <div className="modal-content">
                        <h2>Postuler pour : {selectedJob.title}</h2>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <form onSubmit={handleSubmit}>
                            <label>Nom :</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                            <label>Email :</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                            <label>CV :</label>
                            <label className="file-label" htmlFor="cv-upload">📁 Choisir un fichier</label>
<input 
    type="file" 
    id="cv-upload" 
    className="file-input" 
    name="cv" 
    accept=".pdf,.doc,.docx" 
    onChange={handleChange} 
    required 
/>
<p className="file-name">{formData.cv ? formData.cv.name : "Aucun fichier sélectionné"}</p>

                            <button type="submit" className="btn-ajt">Envoyer</button>
                            <button type="button" className="btn-annuler" onClick={() => setSelectedJob(null)}>Annuler</button>
                        </form>
                    </div>
                </div>
            )}

            {successMessage && <div className="notification">{successMessage}</div>}
        </div>
    );
}

export default Recrutement;
