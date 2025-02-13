import React from 'react';
import '../Mil/Mil.css';  // On suppose que vos styles de loader sont ici

function Loading({ message = "Chargement..." }) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading; 