import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="D1">
      <div className="me">
        <Link to="/" className="T">RH</Link>
      </div>
      <div className="a">
        <Link className="c" to="/">Tableau de Bord</Link>
        <Link className="c" to="/empl">Employés</Link>
        <Link className="c" to="/rec">Recrutement</Link>
        <Link className="c" to="/per">Performance</Link>
        <Link className="c" to="/pai">Paie</Link>
        <Link className="c" to="/con">Congés</Link>
        <Link className="c" to="/uti">Utilisateurs</Link>
      </div>
    </div>
  );
}

export default Header;
