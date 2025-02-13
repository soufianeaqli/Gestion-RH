import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import Logo from './Capture_d_écran_2025-02-08_145637-removebg-preview.png';
import { Link } from 'react-router-dom';

function Header({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Référence au menu pour vérifier si un clic est à l'extérieur

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alterne entre ouvrir et fermer le menu
  };

  // Ferme le menu si un clic se produit en dehors de celui-ci
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false); // Ferme le menu si le clic est en dehors
    }
  };

  // Ajout et nettoyage du gestionnaire d'événements pour le clic extérieur
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="D1">
      <div className="me">
        <Link to="/" className="T">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Icône du menu (hamburger) pour mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>

      {/* Navbar slide */}
<div ref={menuRef} className={`navbar-slide ${isOpen ? 'open' : ''}`}>
  <div className="me">
    <Link to="/" className="T">
      <img src={Logo} alt="Logo" className="logo" />
    </Link>
  </div>
  <Link className="c" to="/">Tableau de Bord</Link>
  <Link className="c" to="/empl">Employés</Link>
  <Link className="c" to="/rec">Recrutement</Link>
  <Link className="c" to="/pai">Paie</Link>
  <Link className="c" to="/con">Congés</Link>

  {/* Bouton de déconnexion dans le menu slide (visible uniquement en responsive) */}
  <button onClick={onLogout} className="btn-logout-mobile">Déconnexion</button>
</div>


      {/* Navigation principale (visible sur grands écrans) */}
      <div className="a">
        <Link className="c" to="/">Tableau de Bord</Link>
        <Link className="c" to="/empl">Employés</Link>
        <Link className="c" to="/rec">Recrutement</Link>
        <Link className="c" to="/pai">Paie</Link>
        <Link className="c" to="/con">Congés</Link>
      </div>

      <button onClick={onLogout} className="btn-logout">Déconnexion</button>
    </div>
  );
}

export default Header;
