import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Vérifiez votre email pour les instructions de réinitialisation.');
        setTimeout(() => {
          setMessage('');
          navigate('/login');
        }, 3000);
      } else {
        setErrorMessage(data.message || 'Une erreur est survenue.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      setErrorMessage('Erreur serveur. Veuillez réessayer.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  useEffect(() => {
    const forgotBox = document.querySelector('.forgot-password-box');
    if (forgotBox) {
      forgotBox.classList.add('zoom-in');
    }
  }, []);

  return (
    <div className="login-page-container">
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="login-box forgot-password-box">
          <div className="text-center mb-4">
            <h2>Mot de passe oublié</h2>
            <p>Entrez votre email pour recevoir un lien de réinitialisation.</p>
          </div>
          <form onSubmit={handleForgotPassword} className="login-form">
            <div className="form-floating mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Envoyer
            </button>
          </form>
          <div className="text-center">
            <Link to="/login" className="text-muted" style={{ textDecoration: 'none' }}>
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>

      {/* Notification de succès */}
      {message && (
        <div className="success-notification">
          {message}
        </div>
      )}

      {/* Notification d'erreur */}
      {errorMessage && (
        <div className="error-notification">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
