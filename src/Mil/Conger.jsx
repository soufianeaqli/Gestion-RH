import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import Notification from './Notification/Notification';

function Conger() {
  // Charger les congés depuis localStorage ou commencer avec une liste vide
  const [Congeés, setCongeés] = useState(() => {
    const storedLeaves = localStorage.getItem("congees");
    return storedLeaves ? JSON.parse(storedLeaves) : []; // Toujours renvoyer un tableau
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeaveId, setCurrentLeaveId] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const startDate = watch("startDate");

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    localStorage.setItem("congees", JSON.stringify(Congeés));
  }, [Congeés]);

  // Ajouter un nouveau congé
  const onSubmit = (data) => {
    const newLeave = {
      id: Date.now(),
      employee: data.employee,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "En attente",
    };

    setCongeés([...Congeés, newLeave]);
    reset();
    setShowTable(true);
  };

  const handleNewRequest = () => setShowTable(false);
  const handleCancelRequest = () => {
    reset();
    setShowTable(true);
  };

  const openModal = (id) => {
    setCurrentLeaveId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentLeaveId(null);
  };

  const supp = () => {
    setCongeés(Congeés.filter((leave) => leave.id !== currentLeaveId));
    setDeleteMessage("La demande de congé a été supprimée avec succès !");
    closeModal();
  };

  const Approuver = (id) => {
    setCongeés(Congeés.map((leave) => 
      leave.id === id ? { ...leave, status: "Approuvé" } : leave
    ));
  };

  const Refuser = (id) => {
    setCongeés(Congeés.map((leave) => 
      leave.id === id ? { ...leave, status: "Rejeté" } : leave
    ));
  };

  return (
    <div>
      {deleteMessage && (
        <Notification message={deleteMessage} onClose={() => setDeleteMessage("")} type="error" /> 
      )}

      {showTable ? (
        <>
          <h1>Gestion des Congés</h1>
          <button className="btn1" onClick={handleNewRequest}>Nouvelle demande</button>
          <table>
            <thead>
              <tr>
                <th>Employé</th>
                <th>Type</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Congeés.length > 0 ? (
                Congeés.map((e) => (
                  <tr key={e.id}>
                    <td>{e.employee}</td>
                    <td>{e.type}</td>
                    <td>{e.startDate}</td>
                    <td>{e.endDate}</td>
                    <td>{e.status}</td>
                    <td>
                      {(e.status === "Approuvé" || e.status === "Rejeté") && (
                        <button className="btn" onClick={() => openModal(e.id)}>Supprimer</button>
                      )}
                      {e.status === "En attente" && (
                        <>
                          <button className="btn2" onClick={() => Approuver(e.id)}>
                            <MdCheckCircle />
                          </button>
                          <button className="btn2" onClick={() => Refuser(e.id)}>
                            <MdCancel />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Aucune demande de congé enregistrée.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <form className="leave-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-title">Nouvelle Demande de Congé</h2>

          <input
            type="text"
            placeholder="Nom de l'employé"
            {...register("employee", { required: "Nom de l'employé est requis" })}
            className="form-input"
          />
          {errors.employee && <p>{errors.employee.message}</p>}

          <select {...register("type", { required: "Sélectionner un type de congé" })} className="form-input">
            <option value="">Sélectionner un type de congé</option>
            <option value="Maladie">Maladie</option>
            <option value="Vacances">Vacances</option>
            <option value="Congé parental">Congé parental</option>
            <option value="Autre">Autre</option>
          </select>
          {errors.type && <p>{errors.type.message}</p>}

          <input
            type="date"
            {...register("startDate", { required: "La date de début est requise" })}
            className="form-input"
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.startDate && <p>{errors.startDate.message}</p>}

          <input
            type="date"
            {...register("endDate", {
              required: "La date de fin est requise",
              validate: (value) => !startDate || value >= startDate || "La date de fin doit être après la date de début"
            })}
            className="form-input"
            min={startDate || new Date().toISOString().split("T")[0]}
            disabled={!startDate}
          />
          {errors.endDate && <p>{errors.endDate.message}</p>}

          <div className="form-actions">
            <button className="form-button-submit" type="submit">Soumettre</button>
            <button className="form-button-cancel" type="button" onClick={handleCancelRequest}>Annuler</button>
          </div>
        </form>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer ce congé ?</p>
            <div className="modal-actions">
              <button className="btn-ajt" onClick={supp}>Confirmer</button>
              <button className="btn-annuler" onClick={closeModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Conger;
