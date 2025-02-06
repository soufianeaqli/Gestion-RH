import React, { useState } from "react";
import { leaves } from './Data'; 
import { useForm } from "react-hook-form";
import { MdCheckCircle, MdCancel } from "react-icons/md"; // Import des icônes
import Notification from './Notification/Notification'; // Importer le composant Notification

function Conger() {
  const [Congeés, setCongeés] = useState(leaves);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeaveId, setCurrentLeaveId] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState(""); // Message de suppression

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const startDate = watch("startDate");

  const onSubmit = (data) => {
    const newLeave = {
      id: Date.now(),
      employee: data.employee,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "En attente",
    };

    setCongeés((prevCongeés) => [...prevCongeés, newLeave]);
    resetForm();
    setShowTable(true);
  };

  const resetForm = () => {
    setValue("employee", "");
    setValue("type", "");
    setValue("startDate", "");
    setValue("endDate", "");
  };

  const handleNewRequest = () => {
    setShowTable(false);
  };

  const handleCancelRequest = () => {
    setShowTable(true);
    resetForm();
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
    setCongeés(Congeés.map(i => i.id === id ? { ...i, status: "Approuvé" } : i));
  };

  const Refuser = (id) => {
    setCongeés(Congeés.map(i => i.id === id ? { ...i, status: "Rejeté" } : i));
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
              {Congeés.map((e) => (
                <tr key={e.id}>
                  <td>{e.employee}</td>
                  <td>{e.type}</td>
                  <td>{e.startDate}</td>
                  <td>{e.endDate}</td>
                  <td>{e.status}</td>
                  <td>
                    {(e.status === "Approuvé" || e.status === "Rejeté") && (
                      <button className="btn" onClick={() => openModal(e.id)}>
                        Supprimer
                      </button>
                    )}
                    {e.status === "En attente" && (
                      <>
                        <button className="btn2" onClick={() => Approuver(e.id)}>
                          <MdCheckCircle /> {/* Icône Approuver */}
                        </button>
                        <button className="btn2" onClick={() => Refuser(e.id)}>
                          <MdCancel /> {/* Icône Refuser */}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
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

          <select
            {...register("type", { required: "Sélectionner un type de congé" })}
            className="form-input"
          >
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
            min={new Date().toISOString().split("T")[0]} // Cette ligne définit la date minimale sur aujourd'hui
          />
          {errors.startDate && <p>{errors.startDate.message}</p>}

          <input
            type="date"
            {...register("endDate", {
              required: "La date de fin est requise",
              validate: (value) => value >= startDate || "La date de fin doit être après la date de début"
            })}
            className="form-input"
            min={startDate}
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
