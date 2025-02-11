import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import Notification from "./Notification/Notification";
import useLocalStorage from "./Uselocalstorage";

function Conger({ setPendingLeavesCount }) {  // Ajouter la fonction `setPendingLeavesCount` passée par le parent
  const [congees, setCongees] = useLocalStorage(
    "congees", []
  );
  useEffect(() => {
    axios.get("http://localhost:8000/api/congees")
    .then(response => {
      setCongees(response.data);
    })
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeaveId, setCurrentLeaveId] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const startDate = watch("startDate");

  // Sauvegarde dans localStorage et mise à jour du compteur de congés en attente
  useEffect(() => {
    localStorage.setItem("congees", JSON.stringify(congees));

    // Calcul du nombre de congés en attente
    const pendingCount = congees.filter(leave => leave.status === "En attente").length;
    setPendingLeavesCount(pendingCount);  // Mettre à jour le compteur dans le parent
  }, [congees, setPendingLeavesCount]);

  // Fonction pour calculer la durée entre la date de début et la date de fin
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Ajouter un nouveau congé avec calcul immédiat de la durée
  const onSubmit = (data) => {
    const newLeave = {
      id: Date.now(),
      employee: data.employee,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "En attente",
      duree: calculateDuration(data.startDate, data.endDate),
    };
    axios.post("http://localhost:8000/api/congees", newLeave)
    .then(response => {
      setCongees([...congees, response.data]);
      reset();
      setShowTable(true);
    })
    .catch(error => {
      console.error("Erreur lors de la création du congé", error);
    });
    
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

  const deleteLeave = () => {
    axios.delete(`http://localhost:8000/api/congees/${currentLeaveId}`)
    .then(() => {
      setCongees(congees.filter((leave) => leave.id !== currentLeaveId));
      setDeleteMessage("La demande de congé a été supprimée avec succès !");
      closeModal();
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du congé", error);
    });
  };

  const approveLeave = (id) => {
    axios.put(`http://localhost:8000/api/congees/${id}`, { status: "Approuvé" })
      .then(response => {
         const updatedCongees = congees.map(leave =>
           leave.id === id ? response.data : leave
         );
         setCongees(updatedCongees);
      })
      .catch(error => {
         console.error("Erreur lors de l'approbation de la demande", error);
      });
  };

  const rejectLeave = (id) => {
    axios.put(`http://localhost:8000/api/congees/${id}`, { status: "Rejeté" })
      .then(response => {
         const updatedCongees = congees.map(leave =>
           leave.id === id ? response.data : leave
         );
         setCongees(updatedCongees);
      })
      .catch(error => {
         console.error("Erreur lors du rejet de la demande", error);
      });
  };

  return (
    <div>
      {deleteMessage && (
        <Notification message={deleteMessage} onClose={() => setDeleteMessage("")} type="error" />
      )}

      <h1>Gestion des Congés </h1>

      {showTable ? (
        <>
          <button className="btn1" onClick={handleNewRequest}>Nouvelle demande</button>
          <table border={1}>
            <thead>
              <tr>
                <th>Employé</th>
                <th>Type</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Durée (jours)</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {congees.length > 0 ? (
                congees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.employee}</td>
                    <td>{e.type}</td>
                    <td>{e.startDate}</td>
                    <td>{e.endDate}</td>
                    <td>{e.duree} jours</td>
                    <td>{e.status}</td>
                    <td>
                      
                      {(e.status === "Approuvé" || e.status === "Rejeté") && (
                        <button className="btn" onClick={() => openModal(e.id)}>Supprimer</button>
                      )}
                      {e.status === "En attente" && (
                        <>
                          <button className="btn2" onClick={() => approveLeave(e.id)}>
                            <MdCheckCircle />
                          </button>
                          <button className="btn2" onClick={() => rejectLeave(e.id)}>
                            <MdCancel />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Aucune demande de congé enregistrée.</td>
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
              <button className="btn-ajt" onClick={deleteLeave}>Confirmer</button>
              <button className="btn-annuler" onClick={closeModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Conger;
