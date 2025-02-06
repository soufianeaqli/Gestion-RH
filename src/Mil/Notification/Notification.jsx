import React, { useEffect } from "react";
import './Notification.css'; // Importer les styles

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Ferme la notification après 3 secondes
    }, 3000); // 3000ms = 3 secondes

    return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté avant la fin
  }, [message, onClose]);

  return (
    <div className="notification">
      <span>{message}</span>
    </div>
  );
};

export default Notification;
