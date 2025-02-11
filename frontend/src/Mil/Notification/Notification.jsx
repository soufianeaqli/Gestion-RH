import React, { useEffect, useState } from "react";
import './Notification.css'; // Importer les styles

const Notification = ({ message, onClose, type }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Lancer la disparition progressive après 2 secondes
      setTimeout(onClose, 500); // Appeler onClose après 500ms pour nettoyer le state
    }, 3000); // Notification visible pendant 3 secondes

    return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté avant la fin
  }, [message, onClose]);

  return (
    <div className={`notification ${type} ${fadeOut ? 'fade-out' : ''}`}>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
