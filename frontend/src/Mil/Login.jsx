import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig'; // Importer la configuration Axios
import './Login.css'
import Notification from './Notification/Notification'; // Assuming you have a Notification component

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("authToken", response.data.token); // Stocker le jeton
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setErrorMessage("Mot de passe incorrect. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      setErrorMessage("Erreur lors de la connexion. Veuillez vérifier vos informations.");
    }
  };

  useEffect(() => {
    const loginBox = document.querySelector('.login-box');
    if (loginBox) {
      loginBox.classList.add('zoom-in');
    }
  }, []);

  return (
    <div className="login-page-container">
      <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
        <div className="login-box">
          <div className="text-center mb-4">
            <h2>Bienvenue</h2>
          </div>
          <form onSubmit={handleLogin} className="login-form">
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
            <div className="form-floating mb-4 password-container">
            <label htmlFor="password">Mot de passe</label>

              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </div>
            <div className="text-end mb-3">
              <Link to="/forgot-password" className="text-muted" style={{ textDecoration: 'none' }}>
                Mot de passe oublié ?
              </Link>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Se connecter</button>
          </form>
          <div className="text-center">
            <span>Vous n'avez pas de compte ? </span>
            <Link to="/register">Créer un compte</Link>
          </div>
        </div>
      </div>
      {errorMessage && (
        <Notification message={errorMessage} onClose={() => setErrorMessage('')} type="error" />
      )}
    </div>
  );
};

export default LoginPage;